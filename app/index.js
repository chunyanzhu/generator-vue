var generators = require('yeoman-generator'),
    _ = require('lodash'),
    glob = require('glob'),
    chalk = require('chalk'),
    log = console.log,
    fs = require('fs'),
    path = require('path'),
    del = require('del'),
    generatorName = 'gulp';

module.exports = generators.Base.extend({
    constructor: function(){
        generators.Base.apply(this, arguments);

        var dirs = glob.sync('+(src)');
        //now _.contains has been abandoned by lodash,use _.includes
        if(_.includes(dirs, 'src')){
            log(chalk.bold.green('资源已经初始化，退出...'));
            process.exit(1);
        }
    },
    prompting: function(){
        var questions = [
            {
                type: 'input',
                name: 'projectName',
                message: '输入项目名称',
                default: this.appname
            },
            {
                type: 'input',
                name: 'projectAuthor',
                message: '项目开发者',
                store: true,
                default: 'zhuchunyan'
            },{
                type: 'input',
                name: 'projectVersion',
                message: '项目版本号',
                default: '0.0.1'
            }
        ]
        return this.prompt(questions).then(
            function(answers){
                for(var item in answers){
                    answers.hasOwnProperty(item) && (this[item] = answers[item]);
                }
            }.bind(this));
    },
    writing: function(){
        this.projectOutput = './dist';
        //拷贝文件
        this.directory('src', 'src');//pram1 是模板中的文件夹 pram2是目标文件夹
        this.copy('package.json', 'package.json');
        this.copy('.babelrc', '.babelrc');
        this.copy('README.md', 'README.md');
        this.copy('webpack.config.js', 'webpack.config.js');
    
        //@this有哪些方法
        
    },
    end: function(){
        del(['src/**/.gitignore','src/**/.npmignore','src/js/index.js']);
    }
})
