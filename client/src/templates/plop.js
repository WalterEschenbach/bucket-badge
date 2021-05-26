const plop = require('plop')

module.exports = function (plop) {
    plop.setPlopfilePath('./src/templates/plop.js')
    // controller generator
    plop.setGenerator('component', {
        description: 'new component template',
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'component name please'
        }],
        actions: [{
            type: 'add',
            path: '../components/{{name}}/{{name}}.js',
            templateFile: './component.js.hbs'
        },
        {
            type: 'add',
            path: '../components/{{name}}/styles.js',
            templateFile: './styles.js.hbs'
        },
        ]
    });
};