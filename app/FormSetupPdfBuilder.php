<?php

namespace App;
use Dompdf\Dompdf;
// use Dompdf\Options;
// use Intervention\Image\ImageManagerStatic as Image;
use Clegginabox\PDFMerger\PDFMerger;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Mail\AttachmentMail;

class FormSetupPdfBuilder {
  private static $instance = null;
  
  /**
   * Get the builder instance.
   *
   * @return FormSetupPdfBuilder
   */
  static function builder() {
    if (self::$instance === null) {
      self::$instance = new FormSetupPdfBuilder;
    }
    return self::$instance;
  }
  
  private $paths = [];
  private $mergedPath = null;
  
  /**
   * Render the document with all data.
   *
   * @return FormSetupPdfBuilder
   */
  function addMain() {
    $imagenBase64 = "data:image/png;base64," . base64_encode(file_get_contents(public_path('/storage/images').'/logo.png'));
    // form setup pdf
    $pdf = new Dompdf;
    $pdf->set_paper('A4', 'portrait');
    $pdf->load_html(view('formsetup.document', [
      'data' => request()->all(),
      'logo' => $imagenBase64,
    ])->render());
    $pdf->render();
    $pdfPath = public_path('/storage/tmp').'/form-setup.pdf';
    file_put_contents($pdfPath, $pdf->output());
    // add to the queue
    $this->paths[] = $pdfPath;
    
    return self::$instance;
  }
  
  /**
   * Put attachments into a pdf or, if already is a pdf, is converted to 1.5 and
   * add to the queue for merged later
   * 
   * @return FormSetupPdfBuilder
   */
  function addAttachments(array $inputFiles) {
    foreach ($inputFiles as $inputName => $frontText) {
      if (request()->hasfile($inputName)) {
        // create the front page
        $front = new Dompdf;
        $front->set_paper('A4', 'portrait');
        $front->load_html(utf8_decode("<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><center><h1>$frontText</h1></center>"));
        $front->render();
        $frontPdfName = substr(md5(uniqid(rand())),0,8).'.pdf';
        $frontPath = public_path('/storage/tmp')."/$frontPdfName";
        file_put_contents($frontPath, $front->output());
        // add file to the queue for merged later
        $this->paths[] = $frontPath;
        // iteratee the files
        foreach(request()->file($inputName) as $file) {
          $mime = $file->getMimeType();
          // Is image, create a pdf with the image occuping all the page size
          if (substr($mime, 0, 5) == 'image') {
            $pdfUniqName = substr(md5(uniqid(rand())),0,8).'.pdf';
            $pdfPath = public_path('/storage/tmp')."/$pdfUniqName";
            $pdfImage = new Dompdf;
            $pdfImage->set_paper('A4', 'portrait');
            $realPath = (new \SplFileInfo($file->path()))->getRealPath();
            $imagenBase64 = base64_encode(file_get_contents($realPath));
            $pdfImage->loadHtml("<img src=\"data:$mime;base64,$imagenBase64\" style=\"max-width: 100%; max-height: 100%;\">");
            $pdfImage->render();
            file_put_contents($pdfPath, $pdfImage->output());
            // add to the queue for merged later
            $this->paths[] = $pdfPath;
          } else { // Is pdf, convert to the 1.5 adobe version with ghostscript
            $pdfName = substr(md5(uniqid(rand())),0,8);
            // $file->move(public_path('/storage/tmp'), "$pdfName.pdf");
            // $uploadedFilePath = public_path('/storage/tmp')."/$pdfName.pdf";
            $convertedUploadedPath = public_path('/storage/tmp')."/$pdfName-converted.pdf";
            $uploadPath = $file->path();
            shell_exec( "gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.5 -dNOPAUSE -dQUIET -dBATCH -sOutputFile=".$convertedUploadedPath." ".$uploadPath."");
            // add to the queue for merged later
            $this->paths[] = $convertedUploadedPath;
          }
        }
      }
    }

    return self::$instance;
  }
  
  /**
   * Iterate between the paths into the queue, merged then and later delete
   * 
   * @return FormSetupPdfBuilder
   */
  function mergedAll() {
    if (count($this->paths)) {
      $pdfMerged = new PDFMerger;
      foreach($this->paths as $path) {
        $pdfMerged->addPDF($path, 'all');
      }
      $mergedName = substr(md5(uniqid(rand())),0,8);
      $this->mergedPath = public_path('/storage/tmp')."/$mergedName.pdf";
      $pdfMerged->merge('file', $this->mergedPath, 'P');
      // delete already merged files
      foreach($this->paths as $pathToDelete) {
        unlink($pathToDelete);
      }
      // reset paths
      $this->paths = [];
    }

    return self::$instance;
  }
  
  /**
   * Send the merged document to admin emails
   * 
   * @return FormSetupPdfBuilder
   */
  function sendToEmail() {
    $emails = explode(',', env('ADMIN_EMAILS'));
    if (Auth::check()) {
      $emails = Auth::user()->email;
    }
    Mail
      ::to($emails)
      ->send(new AttachmentMail(__('Form Setup'), $this->mergedPath));
    unlink($this->mergedPath);
    // reset
    $this->mergedPath = null;

    return self::$instance;
  }
}
