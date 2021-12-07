function initBrowser() {

  var div,
          options,
          browser;

  //define variables to specify file locations to pass to options
  var sample_id = 'G213';
  var base_folder = '/static/data/examples/';

  //only required for reference: fastaURL (to view a local file instead of URL)
  var server_and_port = 'http://localhost:5000';

  //reference
  var preprocessing_genome_assembly = '/assembly/assembled-contigs.fa';
  var fastaURL_preprocessing_genome_assembly = `${server_and_port}${base_folder}${sample_id}${preprocessing_genome_assembly}`;

  //tracks
  //all below paths are relative to base_folder/sample_id
  var prefilter_alignments = '/alignments/engineered_align.bam';
  var url_prefilter_alignments = `${base_folder}${sample_id}${prefilter_alignments}`;
  var prefilter_alignments_index = '/alignments/engineered_align.bam.bai';
  var url_prefilter_alignments_index = `${base_folder}${sample_id}${prefilter_alignments_index}`;

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
                      indexed: false, //must include this if not including indexURL option
      },               
      tracks: [
                  {
                      name: 'Prefilter: Alignments/coverage of all positive reads to assembled genome',
                      url: url_prefilter_alignments,
                      indexURL: url_prefilter_alignments_index,
                      type: 'alignment',
                      //visibilityWindow: 300000,
                      height: 150
                  },

                  {
                      name: 'KI annotation mode: Key indicator location annotation',
                      url: url_ki_annotations,
                      type: 'annotation',
                      displayMode: 'EXPANDED',
                      height: 150,
                      colorBy: 'alignment-type',
                  },

              ],
      // Define global (across all tracks) "region of interest" set

  };

  browser = igv.createBrowser(div, options);
}
