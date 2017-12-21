$(document).ready(function () {

    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['accueil', 'gallerie', 'situation', 'tarifs', 'contact'],
        menu: '#menu'
    });

    $('.ui.embed').embed();

    var map = new GMaps({
        el: '#map',
        lat: 42.980462,
        lng: -0.401079999999979,
        zoom: 13,
    });
    map.addMarker({
        lat: 42.980462,
        lng: -0.401079999999979,
        title: 'Chalet',
    });

    $('#contactform')
        .form({
                on: 'blur',
                fields: {
                    email_from: {
                        identifier: 'email_from',
                        rules: [
                            {
                                type: 'email',
                                prompt: 'Merci de renseigner un email valide.'
                            }
                        ]
                    },
                    email_content: {
                        identifier: 'email_content',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Merci de renseigner un message.'
                            }
                        ]
                    },
                    email_subject: {
                        identifier: 'email_subject',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Merci de renseigner un sujet.'
                            }
                        ]
                    },
                    email_name: {
                        identifier: 'email_name',
                        rules: [
                            {
                                type: 'empty',
                                prompt: 'Merci de renseigner votre nom.'
                            }
                        ]
                    }
                }

            }
        );

    $('#contactform')
        .submit(
            function (event) {
                event.preventDefault();
                if ($('.ui.form').form('is valid')) {
                    // form is valid (both email and name)
                    $.post('http://localhost/php/email.php',
                        {
                            email_name: $('#contactform').find('input[name="email_name"]').val(),
                            email_subject: $('#contactform').find('input[name="email_subject"]').val(),
                            email_from: $('#contactform').find('input[name="email_from"]').val(),
                            email_content: $('#contactform').find('textarea[name="email_content"]').val()
                        },
                        function (data) {
                            console.log(data);
                            $('#sendMailMessage').html('Votre message a bien été envoyé.');
                            $('#sendMailMessage').css('color', 'green');
                        }).fail(function (data) {
                        console.log(data);
                        $('#sendMailMessage').html('Echec de l\'envoi du mail... Veuillez réessayer ultérieurement.');
                        $('#sendMailMessage').css('color', 'red');
                    })
                }
                else {
                    $('#sendMailMessage').html('Veuillez remplir tous les champs.');
                    $('#sendMailMessage').css('color', 'red');
                }
            }
        );

});