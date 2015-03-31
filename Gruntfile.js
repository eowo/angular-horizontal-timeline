module.exports = function(grunt) {
	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		jshint : {
			files : [ 'Gruntfile.js', '*.js' ], options : {
				// options here to override JSHint defaults
				globals : {
					jQuery : true, console : true, module : true, document : true
				}
			}
		},
		watch : {
			jsandcss:{
				files : [ '<%= jshint.files %>', '*.css' ],
				tasks : [ 'jshint', 'wiredep' ]
			}
		},
		wiredep : {
			target : {
				src : [ 'demo.html' ],
				fileTypes: {
			          html: {
			            replace: {
			            	js: '<script src="{{filePath}}"></script>',
			                css: '<link rel="stylesheet" href="{{filePath}}" />'
			            }
			          }
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-wiredep');

	grunt.registerTask('default', [ 'jshint', 'wiredep' ]);
};