function initBrowser() {

  var div,
          options,
          browser;

  div = document.getElementById("myDiv");
  options = {
      reference: {            
                      id: 'id',
                      name: 'name',
                      //fastaURL: 'https://s3.amazonaws.com/igv.broadinstitute.org/genomes/seq/hg19/hg19.fasta',
                      //fastaURL must include http://localhost:5000 to view a local file instead of URL
                      fastaURL: 'http://localhost:5000/static/data/examples/G213/assembly/assembled-contigs.fa', 
                      //fastaURL: 'https://xcvf-ginkgo-example-docs.s3.us-east-2.amazonaws.com/G213/assembly/assembled-contigs.fa',
                      indexed: false, //must include this if not including indexURL option
      },               
      tracks: [
                  {
                      name: 'Prefilter Alignments: BAM Format',
                      url: '/static/data/examples/G213/alignments/G213.filtered.bam',
                      indexed: false,
                      format: 'bam',
                      type: 'alignment',
                      visibilityWindow: 300000,
                      height: 150
                  },
              ],
// Define global (across all tracks) "region of interest" set

  };

  browser = igv.createBrowser(div, options);
}
