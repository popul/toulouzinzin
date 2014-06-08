module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        connect: {
            dev: {
                options: {
                    port: 80,
                    livereload: true,
                    middleware: function(connect) {
                        return [
//                            connect().use('/test', function(req, res) {
//                                res.send('toto');
//                            })
//                            require('grunt-connect-proxy/lib/utils').proxyRequest,
                            connect.static('_site')
//                            connect().use('/lib', connect.static('lib')),
//                            connect().use('/fonts', connect.static('lib/bootstrap/fonts'))
                        ];
                    }
                }
            }
//            proxies: [{
//                context: '/',
//                host: 'localhost',
//                port: 4000
//                rewrite: {
//                    '/': ''
//                }
//            }]
        },
        bowercopy: {
            javascript: {
                options: {
                    destPrefix: 'javascript'
                },
                files: {
                    'jquery.min.js': 'jquery/dist/jquery.min.js',
                    'bootstrap.min.js': 'bootstrap/dist/js/bootstrap.min.js'
                }
            }
        },
        less: {
            build: {
                options: {
                    sourceMap: true,
                    sourceMapFilename: 'css/styles.css.map',
                    sourceMapURL: "styles.css.map",
                    sourceMapRootpath: "/"
                },
                files: {
                    'css/styles.css': 'less/custom-bootstrap.less'
                }
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: true,
                    debounceDelay: 5000
                },
                files: [
                    '_includes/*',
                    '_layouts/*',
                    '_posts/*',
                    'css/*',
                    '*.md',
                    '*.html',
                    '*.yml'
                ]
            },
            less: {
                tasks: ['less:build'],
                files: [
                    'less/*.less'
                ]
            }
        },
        nodemon: {
            jekyll: {
                options: {
                    file: 'Gruntfile.js',
                    exec: 'jekyll build',
                    ext: 'md, html, yml',
                    ignore: [
                        'node_modules/*',
                        '_site/*'
                    ]
                }
            }
        },
        concurrent: {
            dev: [
                'nodemon:jekyll',
                'watch'
            ],
            options: {
                logConcurrentOutput: true,
                limit: 5
            }
        }
    });

    grunt.registerTask('default', [
        'bowercopy',
        'connect:dev',
        'concurrent:dev'
    ]);
}