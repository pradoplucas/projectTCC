const Courses = require('../../app/models/Course.model');

var coursesJSON = []
//############################
//### idNames é para todos
//############################

var idNameG1 = [{
    someId: '1',
    name: 'Atividades esportivas'
},{
    someId: '2',
    name: 'Cursos de língua estrangeira'
},{
    someId: '3',
    name: 'Atividades artísticas e culturais'
},{
    someId: '4',
    name: 'Organização de exposições e seminários de caráter artístico ou cultural'
},{
    someId: '5',
    name: 'Expositor em exposição artística ou cultural'
}]

var idNameG2 = [{
    someId: '1',
    name: 'Diretórios e Centros Acadêmicos, Entidades de Classe, Conselhos e Colegiados internos à Instituição'
},{
    someId: '2',
    name: 'Trabalho voluntário e atividades comunitárias'
},{
    someId: '3',
    name: 'Atividades beneficentes'
},{
    someId: '4',
    name: 'Instrutor em palestras técnicas, seminários, cursos da área específica'
},{
    someId: '5',
    name: 'Docente não remunerado em cursos preparatórios e de reforço escolar'
},{
    someId: '6',
    name: 'Projetos de extensão e de interesse social'
},{
    someId: '7',
    name: 'Monitoria'
}]

var idNameG3 = [{
    someId: '1',
    name: 'Cursos extraordinários da sua área de formação'
},{
    someId: '2',
    name: 'Palestras, congressos e seminários técnico-científicos'
},{
    someId: '3',
    name: 'Apresentador de trabalhos em palestras, congressos e seminários técnico-científicos'
},{
    someId: '4',
    name: 'Projetos de iniciação científica e tecnológica'
},{
    someId: '5',
    name: 'Expositor em exposições técnico-científicas'
},{
    someId: '6',
    name: 'Organização de exposições e seminários de caráter acadêmico'
},{
    someId: '7',
    name: 'Publicações em revistas técnicas'
},{
    someId: '8',
    name: 'Publicações em anais de eventos técnico-científicos'
},{
    someId: '9',
    name: 'Publicações em periódicos científicos'
},{
    someId: '10',
    name: 'Estágio não obrigatório'
},{
    someId: '11',
    name: 'Trabalho com vínculo empregatício'
},{
    someId: '12',
    name: 'Trabalho como empreendedor na área do curso'
},{
    someId: '13',
    name: 'Visitas técnicas organizadas pela UTFPR'
},{
    someId: '14',
    name: 'Aprovação em disciplinas/unidades curriculares de enriquecimento curricular de interesse do Curso'
},{
    someId: '15',
    name: 'Empresa Júnior, Hotel Tecnológico ou Incubadora Tecnológica'
},{
    someId: '16',
    name: 'Projetos multidisciplinares ou interdisciplinares'
},{
    someId: '17',
    name: 'Registro de patente'
},{
    someId: '18',
    name: 'Registro de software'
}]

//########################################################
//########################################################
//########################################################
//### Para Computação - Software - ADS
//########################################################
//########################################################
//########################################################

var valueVBYG1 = [{
    value: '10',
    valueBy: 'semestre'
},{
    value: '10',
    valueBy: 'semestre'
},{
    value: '10',
    valueBy: 'semestre'
},{
    value: '10',
    valueBy: 'evento'
},{
    value: '10',
    valueBy: 'trabalho'
}]

var valueVBYG2 = [{
    value: '10',
    valueBy: 'semestre' 
},{
    value: '10',
    valueBy: 'semestre' 
},{
    value: '10',
    valueBy: 'semestre' 
},{
    value: '5',
    valueBy: 'hora' 
},{
    value: '30',
    valueBy: 'semestre' 
},{
    value: '30',
    valueBy: 'semestre' 
},{
    value: '30',
    valueBy: 'semestre' 
}]

var valueVBYG3 = [{
    value: '1',
    valueBy: 'hora' 
},{
    value: '1',
    valueBy: 'hora' 
},{
    value: '5',
    valueBy: 'hora' 
},{
    value: '30',
    valueBy: 'projeto' 
},{
    value: '10',
    valueBy: 'trabalho' 
},{
    value: '10',
    valueBy: 'evento' 
},{
    value: '10',
    valueBy: 'publicação' 
},{
    value: '20',
    valueBy: 'publicação' 
},{
    value: '40',
    valueBy: 'publicação' 
},{
    value: '0.5',
    valueBy: 'hora' 
},{
    value: '0.5',
    valueBy: 'hora' 
},{
    value: '0.5',
    valueBy: 'hora' 
},{
    value: '10',
    valueBy: 'visita' 
},{
    value: '10',
    valueBy: 'disciplina' 
},{
    value: '30',
    valueBy: 'participação' 
},{
    value: '30',
    valueBy: 'projeto' 
},{
    value: '40',
    valueBy: 'registro' 
},{
    value: '40',
    valueBy: 'registro' 
}]

var actG1 = []
var actG2 = []
var actG3 = []

for(let i = 0; i < idNameG1.length; i++){
    idNameG1[i]['value'] = valueVBYG1[i]['value'];
    idNameG1[i]['valueBy'] = valueVBYG1[i]['valueBy'];
    actG1.push(idNameG1[i]);
}

for(let i = 0; i < idNameG2.length; i++){
    idNameG2[i]['value'] = valueVBYG2[i]['value'];
    idNameG2[i]['valueBy'] = valueVBYG2[i]['valueBy'];
    actG2.push(idNameG2[i]);
}

for(let i = 0; i < idNameG3.length; i++){
    idNameG3[i]['value'] = valueVBYG3[i]['value'];
    idNameG3[i]['valueBy'] = valueVBYG3[i]['valueBy'];
    actG3.push(idNameG3[i]);
}

coursesJSON.push({
    initName: 'ESW',
    shortName: 'Eng. Software',
    fullName: 'Engenharia de Software',
    docLink: 'http://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-bacharelado-em-engenharia-de-software/area-academica/atividades-complementares',
    groups: [{
        groupId: 'g1',
        groupName: 'GRUPO 1 - Atividades de complementação da formação social, humana e cultural',
        activities: actG1
    },{
        groupId: 'g2',
        groupName: 'GRUPO 2 - Atividades de cunho comunitário e de interesse coletivo',
        activities: actG2
    },{
        groupId: 'g3',
        groupName: 'GRUPO 3 - Atividades de iniciação científica, tecnológica e de formação profissional',
        activities: actG3
    }]

})

coursesJSON.push({
    initName: 'ECP',
    shortName: 'Eng. Computação',
    fullName: 'Engenharia de Computação',
    docLink: 'http://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-engenharia-de-computacao/area-academica/atividades-complementares',
    groups: [{
        groupId: 'g1',
        groupName: 'GRUPO 1 - Atividades de complementação da formação social, humana e cultural',
        activities: actG1
    },{
        groupId: 'g2',
        groupName: 'GRUPO 2 - Atividades de cunho comunitário e de interesse coletivo',
        activities: actG2
    },{
        groupId: 'g3',
        groupName: 'GRUPO 3 - Atividades de iniciação científica, tecnológica e de formação profissional',
        activities: actG3
    }]

})

coursesJSON.push({
    initName: 'ADS',
    shortName: 'ADS',
    fullName: 'Análise e Desenvolvimento de Sistemas',
    docLink: 'http://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-tecnologia-em-analise-e-desenvolvimento-de-sistemas/area-academica/atividades-complementares',
    groups: [{
        groupId: 'g1',
        groupName: 'GRUPO 1 - Atividades de complementação da formação social, humana e cultural',
        activities: actG1
    },{
        groupId: 'g2',
        groupName: 'GRUPO 2 - Atividades de cunho comunitário e de interesse coletivo',
        activities: actG2
    },{
        groupId: 'g3',
        groupName: 'GRUPO 3 - Atividades de iniciação científica, tecnológica e de formação profissional',
        activities: actG3
    }]

})

//########################################################
//########################################################
//########################################################
//### Para Elétrica - Eletrônica - Automação
//########################################################
//########################################################
//########################################################

var valueVBYG1 = [{
    value: '5',
    valueBy: 'semestre'
},{
    value: '5',
    valueBy: 'semestre'
},{
    value: '5',
    valueBy: 'semestre'
},{
    value: '5',
    valueBy: 'evento'
},{
    value: '10',
    valueBy: 'trabalho'
}]

var valueVBYG2 = [{
    value: '5',
    valueBy: 'semestre' 
},{
    value: '10',
    valueBy: 'semestre' 
},{
    value: '10',
    valueBy: 'semestre' 
},{
    value: 'na',
    valueBy: 'hora' 
},{
    value: 'na',
    valueBy: 'semestre' 
},{
    value: 'na',
    valueBy: 'semestre' 
},{
    value: 'na',
    valueBy: 'semestre' 
}]

var valueVBYG3 = [{
    value: '0.5',
    valueBy: 'hora' 
},{
    value: '1',
    valueBy: 'hora' 
},{
    value: '5',
    valueBy: 'hora' 
},{
    value: '15',
    valueBy: 'projeto' 
},{
    value: 'na',
    valueBy: 'trabalho' 
},{
    value: 'na',
    valueBy: 'evento' 
},{
    value: '10',
    valueBy: 'publicação' 
},{
    value: '10',
    valueBy: 'publicação' 
},{
    value: '10',
    valueBy: 'publicação' 
},{
    value: '0.5',
    valueBy: 'hora' 
},{
    value: '0.5',
    valueBy: 'hora' 
},{
    value: '0.5',
    valueBy: 'hora' 
},{
    value: '5',
    valueBy: 'visita' 
},{
    value: 'na',
    valueBy: 'disciplina' 
},{
    value: 'na',
    valueBy: 'participação' 
},{
    value: 'na',
    valueBy: 'projeto' 
},{
    value: 'na',
    valueBy: 'registro' 
},{
    value: 'na',
    valueBy: 'registro' 
}]

var actG1 = []
var actG2 = []
var actG3 = []

for(let i = 0; i < idNameG1.length; i++){
    idNameG1[i]['value'] = valueVBYG1[i]['value'];
    idNameG1[i]['valueBy'] = valueVBYG1[i]['valueBy'];
    actG1.push(idNameG1[i]);
}

for(let i = 0; i < idNameG2.length; i++){
    idNameG2[i]['value'] = valueVBYG2[i]['value'];
    idNameG2[i]['valueBy'] = valueVBYG2[i]['valueBy'];
    actG2.push(idNameG2[i]);
}

for(let i = 0; i < idNameG3.length; i++){
    idNameG3[i]['value'] = valueVBYG3[i]['value'];
    idNameG3[i]['valueBy'] = valueVBYG3[i]['valueBy'];
    actG3.push(idNameG3[i]);
}

coursesJSON.push({
    initName: 'ELE',
    shortName: 'Eng. Elétrica',
    fullName: 'Engenharia Elétrica',
    docLink: 'http://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-engenharia-eletrica/area-academica/atividades-complementares',
    groups: [{
        groupId: 'g1',
        groupName: 'GRUPO 1 - Atividades de complementação da formação social, humana e cultural',
        activities: actG1
    },{
        groupId: 'g2',
        groupName: 'GRUPO 2 - Atividades de cunho comunitário e de interesse coletivo',
        activities: actG2
    },{
        groupId: 'g3',
        groupName: 'GRUPO 3 - Atividades de iniciação científica, tecnológica e de formação profissional',
        activities: actG3
    }]

})

coursesJSON.push({
    initName: 'ELT',
    shortName: 'Eng. Eletrônica',
    fullName: 'Engenharia Eletrônica',
    docLink: 'http://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-engenharia-eletronica/area-academica/atividades-complementares',
    groups: [{
        groupId: 'g1',
        groupName: 'GRUPO 1 - Atividades de complementação da formação social, humana e cultural',
        activities: actG1
    },{
        groupId: 'g2',
        groupName: 'GRUPO 2 - Atividades de cunho comunitário e de interesse coletivo',
        activities: actG2
    },{
        groupId: 'g3',
        groupName: 'GRUPO 3 - Atividades de iniciação científica, tecnológica e de formação profissional',
        activities: actG3
    }]

})

coursesJSON.push({
    initName: 'ECA',
    shortName: 'Eng. Contr. Automação',
    fullName: 'Engenharia de Controle e Automação',
    docLink: 'http://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-engenharia-de-controle-e-automacao/area-academica/atividades-complementares',
    groups: [{
        groupId: 'g1',
        groupName: 'GRUPO 1 - Atividades de complementação da formação social, humana e cultural',
        activities: actG1
    },{
        groupId: 'g2',
        groupName: 'GRUPO 2 - Atividades de cunho comunitário e de interesse coletivo',
        activities: actG2
    },{
        groupId: 'g3',
        groupName: 'GRUPO 3 - Atividades de iniciação científica, tecnológica e de formação profissional',
        activities: actG3
    }]

})

coursesJSON.push({
    initName: 'EMC',
    shortName: 'Eng. Mecânica',
    fullName: 'Engenharia Mecânica',
    docLink: 'http://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-engenharia-mecanica/area-academica/atividades-complementares',
    groups: [{
        groupId: 'g1',
        groupName: 'GRUPO 1 - Atividades de complementação da formação social, humana e cultural',
        activities: actG1
    },{
        groupId: 'g2',
        groupName: 'GRUPO 2 - Atividades de cunho comunitário e de interesse coletivo',
        activities: actG2
    },{
        groupId: 'g3',
        groupName: 'GRUPO 3 - Atividades de iniciação científica, tecnológica e de formação profissional',
        activities: actG3
    }]

})


//########################################################
//########################################################
//########################################################
//### Para Matemática
//########################################################
//########################################################
//########################################################

var valueVBYG1 = [{
    value: '10',
    valueBy: 'semestre'
},{
    value: '20',
    valueBy: 'semestre'
},{
    value: '5',
    valueBy: 'atividade'
},{
    value: '5',
    valueBy: 'atividade'
},{
    value: '5',
    valueBy: 'atividade'
}]

var valueVBYG2 = [{
    value: '20',
    valueBy: 'semestre' 
},{
    value: '10',
    valueBy: 'atividade' 
},{
    value: '10',
    valueBy: 'atividade' 
},{
    value: '10',
    valueBy: 'atividade' 
},{
    value: '10',
    valueBy: 'semestre' 
},{
    value: '5',
    valueBy: 'atividade' 
},{
    value: '30',
    valueBy: 'semestre' 
}]

var valueVBYG3 = [{
    value: '1',
    valueBy: 'hora' 
},{
    value: '1',
    valueBy: 'hora' 
},{
    value: '5',
    valueBy: 'trabalho' 
},{
    value: '40',
    valueBy: 'semestre' 
},{
    value: '5',
    valueBy: 'trabalho' 
},{
    value: '10',
    valueBy: 'evento' 
},{
    value: '10',
    valueBy: 'trabalho' 
},{
    value: '10',
    valueBy: 'trabalho' 
},{
    value: '25',
    valueBy: 'trabalho' 
},{
    value: '1',
    valueBy: 'hora' 
},{
    value: '1',
    valueBy: 'hora' 
},{
    value: 'na',
    valueBy: 'hora' 
},{
    value: 'na',
    valueBy: 'visita' 
},{
    value: '30',
    valueBy: 'disciplina' 
},{
    value: 'na',
    valueBy: 'participação' 
},{
    value: 'na',
    valueBy: 'projeto' 
},{
    value: 'na',
    valueBy: 'registro' 
},{
    value: 'na',
    valueBy: 'registro' 
}]

var actG1 = []
var actG2 = []
var actG3 = []

for(let i = 0; i < idNameG1.length; i++){
    idNameG1[i]['value'] = valueVBYG1[i]['value'];
    idNameG1[i]['valueBy'] = valueVBYG1[i]['valueBy'];
    actG1.push(idNameG1[i]);
}

for(let i = 0; i < idNameG2.length; i++){
    idNameG2[i]['value'] = valueVBYG2[i]['value'];
    idNameG2[i]['valueBy'] = valueVBYG2[i]['valueBy'];
    actG2.push(idNameG2[i]);
}

for(let i = 0; i < idNameG3.length; i++){
    idNameG3[i]['value'] = valueVBYG3[i]['value'];
    idNameG3[i]['valueBy'] = valueVBYG3[i]['valueBy'];
    actG3.push(idNameG3[i]);
}

coursesJSON.push({
    initName: 'LMT',
    shortName: 'Lic. Matemática',
    fullName: 'Licenciatura em Matemática',
    docLink: 'http://www.utfpr.edu.br/cursos/coordenacoes/graduacao/cornelio-procopio/cp-licenciatura-em-matematica/area-academica/atividades-complementares',
    groups: [{
        groupId: 'g1',
        groupName: 'GRUPO 1 - Atividades de complementação da formação social, humana e cultural',
        activities: actG1
    },{
        groupId: 'g2',
        groupName: 'GRUPO 2 - Atividades de cunho comunitário e de interesse coletivo',
        activities: actG2
    },{
        groupId: 'g3',
        groupName: 'GRUPO 3 - Atividades de iniciação científica, tecnológica e de formação profissional',
        activities: actG3
    }]

})



coursesJSON.forEach(courseOne => {
    

    new Courses(courseOne).save().then(() => {
        console.log('Ok: ' + courseOne.initName);
    }).catch((err) => {
        console.log('Errr: ' + courseOne.initName);
    });
    
});

