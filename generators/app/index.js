'use strict'
const Generator = require('yeoman-generator')
const c = require('8colors')

module.exports = class extends Generator {
  prompting() {
    this.log(c.by('FalconJS Component Generator').end())
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Name your FalconJS component',
        default: this.appname
      },
      {
        type: 'input',
        name: 'version',
        message: 'Version',
        default: '1.0.0'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Description of your Component',
        default: ''
      },
      {
        type: 'input',
        name: 'keywords',
        message: 'Keywords',
        default: 'falconjs-component, '
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Author',
        default: this.config.get('authorName')
      },
      {
        type: 'input',
        name: 'authorEmail',
        message: 'Author\'s email',
        default: this.config.get('authorEmail')

      },
      {
        type: 'input',
        name: 'authorUrl',
        message: 'Author\s URL',
        default: this.config.get('authorUrl')
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props
    })
  }

  writing() {
    this.config.set({
      authorName: this.props.authorName,
      authorEmail: this.props.authorEmail,
      authorUrl: this.props.authorUrl
    })
    this.config.save()
    this.fs.copyTpl(
      this.templatePath('./**/*'),
      this.destinationPath('.'),
      { name: this.props.name,
        version: this.props.version,
        description: this.props.description,
        keywords: this.props.keywords,
        author: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl,
        year: new Date().getFullYear()
      }
    )
    this.fs.copy(
      this.templatePath('./dots/.'),
      this.destinationPath('.')
    )
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: true
    })
  }
}
