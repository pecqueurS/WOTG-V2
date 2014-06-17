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
		if(!empty($_POST)) {var_dump($_POST); }
		if(!empty($_FILES)) {var_dump($_FILES); die;}
		$loginForm = Forms::make('Inscription');
		if(!$loginForm->isValid()) {
			$response['formInscription'] = $loginForm->render();
		} else {
			$profil = new Profil();
			if($profil->connexion($_POST)){
				header("location:".URL_PROFIL);
			} else {
				$response['formInscription'] = $loginForm->render();
			}
		}
		return $response;
	}


}



?>