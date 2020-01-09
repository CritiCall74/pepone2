<?php
if(isset($_POST['send']) and ($_GET['ok'])){
   
    $nom = strip_tags(trim($_POST['user_name']));
    $mail = strip_tags(trim($_POST['user_mail']));
    $object = strip_tags(trim($_POST['object']));
    $phone = strip_tags(trim($_POST['user_phone']));
    $text = strip_tags(trim($_POST['user_message']));
	$ok = true;
	$message="Nom : $nom <br>" . "\r\n" . "Mail : $mail <br>" . "\r\n" . "Objet : $object <br>" . "\r\n" . "Téléphone : $phone <br>" . "\r\n" . "Message : $text <br>";
		if($ok) {
            $destinataire = "donzelgargandtom@gmail.com";
            $headers = "From: $mail" . "\r\n".
            "Reply-To: $mail" . "\r\n" .
            'X-Mailer: PHP/' . phpversion(). "\r\n".
			'MIME-Version:1.0'. "\r\n".
            'Content-type:text/html; charset=UTF-8'. "\r\n";
            
		
            if(mail($destinataire, $object, $message, $headers)) {
                echo '<script type="text/javascript">window.alert("Merci, votre message a bien été transmis.");</script>';
                header("location:contact.html");
				
            }else{
                echo "<p class='text-danger'>Une erreur s'est produite. Veuillez réessayer</p>";
				
            }
        }
}
?>