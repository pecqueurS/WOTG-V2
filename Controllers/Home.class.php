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

	public function showForgotPwd() {
		$response = array();


		$forgotPwdForm = Forms::make('ForgotPwd');
		if(!$forgotPwdForm->isValid()) {
			$response['formForgotPwd'] = $forgotPwdForm->render();
		} else {
			$profil = new Profil();
			if($profil->forgot_pwd($_POST)){
				header("location:".URL_RECUP_PWD);
			} else {
				$response['formForgotPwd'] = $forgotPwdForm->render();
			}
		}
		return $response;
	}

	public function showGetNewPwd() {
		$response = array();
		
		return $response;
	}

	public function showSendMail() {
		$response = array();
		
		return $response;
	}

	public function showConfirmInscript($log, $code) {
		$response = array();
		$profil = new Profil();
		
		if(!$profil->active_compte($log,$code)) {
			header("location:".URL_ACCUEIL);
		}
		
		return $response;
	}

}



?>