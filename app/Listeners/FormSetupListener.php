<?php

namespace App\Listeners;

use App\Events\DocumentCreated;
use App\FormSetupPdfBuilder;

class FormSetupListener
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(DocumentCreated $event): void
    {
        if ($event->name === 'form-setup.process') {
            FormSetupPdfBuilder::builder()
                ->addMain()
                ->addAttachments([
                    'ein_file' => 'EIN document',
                    'state_registration_file' => 'State Registration Document',
                    'payroll_summary_report_file' => 'Payroll summary reports',
                    'pay_stub_copy_file' => 'Pay stub copy',
                    'report_941_file' => '941 report',
                    'unemployment_license_file' => 'Unemployment ID license',
                    'unemployment_report_file' => 'Unemployment Report',
                    'withholding_id_license_file' => 'Withholding ID license',
                    'withholding_report_file' => 'Wage Withholding Report',
                    'salex_tax_license_file' => 'Sales Tax License',
                    'salex_tax_reports_file' => 'Previous Reports',
                    'taxes_files' => 'Taxes Files',
                    'additional_requisites_file' => 'Additional Requisites',
                ])
                ->mergedAll()
                ->sendToEmail();
        }
    }
}
