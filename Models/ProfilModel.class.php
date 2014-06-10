<?php


namespace WotG\Models;

use Bundles\Bdd\Db;
use Bundles\Bdd\Model;


class ProfilModel extends Model {

	protected $tableName = "joueurs";
	
	public function __construct() {
		parent::__construct();
	}

	public static function init() {
		$mod = new ProfilModel();
		return $mod;
	}

	public function infosPlayer($login){
		$this->table = $this->db->addRule("jou_login", $login)
								->select();
		return $this;
	}

	public function setPlayer($values, $fields, $id) {
		return $this->db->addRule("jou_id", $id)
						->update($values, $fields);
	}




}


?>