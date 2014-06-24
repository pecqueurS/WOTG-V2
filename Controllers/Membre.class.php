<?php

namespace WotG\Controllers;

use Bundles\Formulaires\Forms;
use WotG\Bundles\Profil\Profil;
/**
* 
*/
class Membre {
	
	public function __construct() {
		# code...
	}

	public function showInscription() {
		$response = array();
		$loginForm = Forms::make('Inscription');
		if(!$loginForm->isValid()) { 
			$response['formInscription'] = $loginForm->render();
		} else {
			$profil = new Profil();
			if($profil->inscription($_POST)){
				header("location:".URL_ENV_MAIL);
			} else {
				$response['formInscription'] = $loginForm->render();
			}
		}
		return $response;
	}


}



?>