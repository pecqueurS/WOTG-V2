<?php


namespace WotG\Models;

use Bundles\Bdd\Db;
use Bundles\Bdd\Model;

use WotG\Services\Timer\Timer;


class VerifConnectionsModel extends Model {

	protected $tableName = "verif_connections";
	
	public function __construct() {
		parent::__construct();
	}

	public static function init() {
		$mod = new VerifConnectionsModel();
		return $mod;
	}

	public function insert($id) {
		$values = array( NULL, $id, Timer::currentTimestamp(), $_SERVER['REMOTE_ADDR'], NULL, session_id());
		return $this->db->insert($values);
	}

	




}


?>