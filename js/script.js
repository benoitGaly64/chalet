$(document).ready(function () {
    $('#fullpage').fullpage({
        sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE', 'whitesmoke', '#ccddff'],
        anchors: ['accueil', 'gallerie', 'situation', 'tarifs', 'contact'],
        menu: '#menu'
    });
    $('.ui.embed').embed();
    $('#contactform')
        .form({
                on: 'blur',
                fields: {
                    emailfrom: {
                        identifier: 'emailfrom',
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
                            emailfrom: $('#contactform').find('input[name="emailfrom"]').val(),
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