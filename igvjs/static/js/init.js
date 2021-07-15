function initBrowser() {

  var div,
          options,
          browser;

  div = document.getElementById("myDiv");
  options = {
      genome: "sacCer3",
      locus: "chrI",
      tracks: [
                  {
                      name: "ROI: Bed Format",
                      type: 'annotation',
                      displayMode: "EXPANDED",
                      height: 50,
                      url: "/static/data/examples/roi_bed_1_custom.bed",
                      order: 0 //pin this track to the top
                  },

                  {
                      name: 'Prefilter Alignments: BAM Format',
                      url: '/static/data/examples/MATalpha_R1.bam',
                      indexed: false,
                      format: 'bam',
                      type: 'alignment',
                      visibilityWindow: 300000,
                      height: 150
                  },

                  {
                      name: "CNN-Align Activations: WIG Format",
                      type: "wig",
                      displayMode: "EXPANDED",
                      height: 150,
                      url: "/static/data/examples/variableStep-example-custom.wig",
                      guideLines: [
                        {color: "red", dotted: false, y: 10}
                    ]
                  },


                  {
                      name: 'Key Indicators: GFF3 Format',
                      url: '/static/data/examples/eden_custom.gff3',
                      type: 'annotation',
                      displayMode: 'EXPANDED',
                      height: 150,

                  },
              ],
// Define global (across all tracks) "region of interest" set
      roi: [
                {
                    name: "ROI",
                    url: "/static/data/examples/roi_bed_1_custom.bed",
                    color: "rgba(68, 134, 247, 0.1)"
                }
            ]
  };

  browser = igv.createBrowser(div, options);
}
