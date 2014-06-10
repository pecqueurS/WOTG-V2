<?php

namespace WotG\Services\Mails\Tpl;

use Bundles\Parametres\Conf;
use Bundles\Templates\ExtentionsTwig\FormExtTwig;

use Bundles\Templates\Tpl;

/**
* 
*/
class MailsTpl extends Tpl {
	
	public static function display($vars = array(), $tpl = null) {
		$tplObj = new Tpl('/App/'.Conf::$appName.'/Services/Mails/Tpl/Matrices');
		//$this->dirTwigTpl = '/Bundles/Formulaires/Tpl';
		return $tplObj->addVars($vars)->getTpl($tpl);
	}

	

}







?>