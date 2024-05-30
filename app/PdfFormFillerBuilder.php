<?php
namespace App;


class PdfFormFillerBuilder {
  private static $instance = null;
  
  /**
   * Get the builder instance.
   *
   * @return PdfFormFillerBuilder
   */
  static function builder() {
    if (self::$instance === null) {
      self::$instance = new PdfFormFillerBuilder;
    }

    return self::$instance;
  }

  private string $source;
  private array $fields;
  
  function __construct() {
    if (self::$instance !== null) {
      throw new \RuntimeException('This builder is not instanciable');
    }

    $this->source = '';
    $this->fields = [];
  }
  
  /**
   * Define the path of pdf file.
   *
   * @return PdfFormFillerBuilder
   */
  public function path(string $source) {
    if (!@file_exists($source)) {
      throw new \RuntimeException("PDF file $source no exits!!");
    } else if (mime_content_type($source) !== 'application/pdf') {
      throw new \RuntimeException("File $source must be 'application/pdf' file.");
    }

    $this->source = $source;
    
    return $this;
  }
  
  /**
   * Add field/value pair.
   *
   * @return PdfFormFillerBuilder
   */
  public function input(string $name, $value) {
    $this->fields[$name] = $value;
    
    return $this;
  }
  
  /**
   * add check.
   *
   * @return PdfFormFillerBuilder
   */
  public function check(string $name, bool $checked) {
    if (!$checked) {
      $this->fields[$name] = '0';
    }
    
    return $this;
  }

  public function fillAndFlatten(string $output) {
    try {
      $pdf = \Zend_Pdf::load($this->source);
      foreach ($this->fields as $key => $value) {
        if (in_array($key, $pdf->getTextFieldNames())) {
          $pdf->setTextField($key, $value);
        }
      }
      // flatten
      foreach ($pdf->getTextFieldNames() as $field) {
        $pdf->markTextFieldAsReadOnly($field);
      }
      // save...
      $pdf->save($output);
    } catch (\Exception $ex) {
      throw new \RuntimeException($ex->getMessage());
    }
    
    // reset
    $this->source = '';
    $this->fields = [];
  }

  static public function fillAndFlattenFromArray(string $source, array $data) {
    if (@file_exists($source)) {
      $outputPath = public_path('storage/tmp');
      $uniqId = substr(base_convert(sha1(uniqid(mt_rand())), 16, 36), 0, 10);
      $outputFile = "$uniqId.pdf";
      $output = "$outputPath/$outputFile";
      try {
        $pdf = \Zend_Pdf::load($source);
        foreach ($data as $key => $value) {
          if (in_array($key, $pdf->getTextFieldNames())) {
            $pdf->setTextField($key, $value);
          }
        }
        // flatten
        foreach ($pdf->getTextFieldNames() as $field) {
          $pdf->markTextFieldAsReadOnly($field);
        }
        // save...
        $pdf->save($output);
      } catch (\Exception $ex) {
        throw new \RuntimeException($ex->getMessage());
      }
      return $output;
    }
    throw new \RuntimeException("File $source no exits!!");
  }
}
