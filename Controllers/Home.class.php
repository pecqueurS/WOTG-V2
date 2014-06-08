<?php

namespace WotG\Controllers;

use Bundles\Formulaires\Forms;
use WotG\Bundles\Profil\Profil;
/**
* 
*/
class Home {
	
	public function __construct() {
		# code...
	}

	public function showHome() {
		$response = array();

		$loginForm = Forms::make('Login');
		if(!$loginForm->isValid()) {
			$response['formLogin'] = $loginForm->render();
		} else {
			$profil = new Profil();
			if($profil->connexion($_POST)){
				header("location:".URL_PROFIL);
			} else {
				$response['formLogin'] = $loginForm->render();
			}
		}
		return $response;
	}

}



?>