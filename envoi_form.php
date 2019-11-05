<?php
if(isset($_POST['send'])){
   
    $nom = strip_tags(trim($_POST['user_name']));
    $mail = strip_tags(trim($_POST['user_mail']));
    $object = strip_tags(trim($_POST['object']));
    $phone = strip_tags(trim($_POST['user_phone']));
    $text = strip_tags(trim($_POST['user_message']));
	$ok = true;
	$message="Nom : $nom"."\r\n"."Mail : $mail"."\r\n"."Objet : $object"."\r\n"."Téléphone : $phone"."\r\n"."Message : $text";
		if($ok) {
            $destinataire = "???????????????????";
            $headers = "From: $mail" . "\r\n".
            "Reply-To: $mail" . "\r\n" .
            'X-Mailer: PHP/' . phpversion(). "\r\n".
			'MIME-Version:1.0'. "\r\n".
			'Content-type:text/html; charset=UTF-8'. "\r\n";
		
            if(mail($destinataire,"Demande de contact",$message, $headers)) {
				header("location:contact.html");
				
            }else{
                echo "<p class='text-danger'>Une erreur s'est produite. Veuillez réessayer</p>";
				
            }
        }
}
?>