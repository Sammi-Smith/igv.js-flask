function initBrowser(parameter_for_sample_id) {

  if (parameter_for_sample_id === undefined) {
    parameter_for_sample_id = 'sample_id_not_provided';

  }
  console.log(`parameter_for_sample_id: ${parameter_for_sample_id}`);

  var div,
          options,
          browser;

  //define variables to specify file locations to pass to options
  var sample_id = parameter_for_sample_id;
  var base_folder = '/static/data/examples/';

  //only required for reference: fastaURL (to view a local file instead of URL)
  var server_and_port = 'http://localhost:5000';

  //reference
  var preprocessing_genome_assembly = '/assembly/assembled-contigs.fa';
  var fastaURL_preprocessing_genome_assembly = `${server_and_port}${base_folder}${sample_id}${preprocessing_genome_assembly}`;
  var preprocessing_genome_assembly_index = '/assembly/assembled-contigs.fa.fai';
  var indexURL_preprocessing_genome_assembly = `${server_and_port}${base_folder}${sample_id}${preprocessing_genome_assembly_index}`;

  //tracks
  //all below paths are relative to base_folder/sample_id
  var preprocessing_annotations_prokka = '/annotations/prokka_annotate/prok_output/sample.gff';
  var url_preprocessing_annotations_prokka = `${base_folder}${sample_id}${preprocessing_annotations_prokka}`;

  var preprocessing_annotations_prodigal = '/annotations/prodigal_annotate/coords.gff';
  var url_preprocessing_annotations_prodigal = `${base_folder}${sample_id}${preprocessing_annotations_prodigal}`;

  var preprocessing_annotations_prokaryotic_mobile_element = '/annotations/mobile_element_prok/prok_mef.gff';
  var url_preprocessing_annotations_prokaryotic_mobile_element = `${base_folder}${sample_id}${preprocessing_annotations_prokaryotic_mobile_element}`;

  var prefilter_alignments = '/alignments/engineered_align.bam';
  var url_prefilter_alignments = `${base_folder}${sample_id}${prefilter_alignments}`;
  var prefilter_alignments_index = '/alignments/engineered_align.bam.bai';
  var indexURL_prefilter_alignments_index = `${base_folder}${sample_id}${prefilter_alignments_index}`;

  var ki_annotations = '/annotations/key-indicators.gff';
  var url_ki_annotations = `${base_folder}${sample_id}${ki_annotations}`;

  console.log(url_ki_annotations);
  

  div = document.getElementById("myDiv");
  
  //specify browser config
  options = {
      reference: {            
                      id: sample_id,
                      name: 'Genome assembly',
                      fastaURL: fastaURL_preprocessing_genome_assembly,
                      indexURL: indexURL_preprocessing_genome_assembly, 
      },               
      tracks: [
                  {
                      name: 'Preprocessing: Gene annotation, prokka',
                      url: url_preprocessing_annotations_prokka,
                      type: 'annotation',
                      displayMode: 'EXPANDED',
                      autoHeight: true,
                      colorBy: 'product',
                  },

                  {
                      name: 'Preprocessing: Gene annotation, prodigal',
                      url: url_preprocessing_annotations_prodigal,
                      type: 'annotation',
                      displayMode: 'EXPANDED',
                      autoHeight: true,
                  },

                  {
                      name: 'Preprocessing: Prokaryotic mobile element annotation',
                      url: url_preprocessing_annotations_prokaryotic_mobile_element,
                      type: 'annotation',
                      displayMode: 'EXPANDED',
                      autoHeight: true,
                  },

                  {
                      name: 'Prefilter: Alignments/coverage of all positive reads to assembled genome',
                      url: url_prefilter_alignments,
                      indexURL: indexURL_prefilter_alignments_index,
                      type: 'alignment',
                      //visibilityWindow: 300000,
                      autoHeight: true,
                  },

                  {
                      name: 'KI annotation mode: Key indicator location annotation',
                      url: url_ki_annotations,
                      type: 'annotation',
                      displayMode: 'EXPANDED',
                      autoHeight: true,
                      colorBy: 'alignment-type',
                  },

              ],
      // Define global (across all tracks) "region of interest" set

  };

  browser = igv.createBrowser(div, options);
}
