module game_park::user_info;

use std::string::String;
use sui::package::Publisher;
use sui::table::{Self, Table};

// error code
const E_Not_Equal_Pwd: u64 = 3;

public struct UserTable has key {
    id: UID,
    table: Table<String, String>
}

fun init(ctx: &mut TxContext) {
    transfer::share_object(UserTable {
        id: object::new(ctx),
        table: table::new<String, String>(ctx)
    });
}

entry fun bind(_: &Publisher, user_table: &mut UserTable, user: String, pwd: String) {
    user_table.table.add(user, pwd);
}

entry fun rebind(_: &Publisher, user_table: &mut UserTable, user: String, pwd: String, new_pwd: String) {
    let stored = &mut user_table.table[user];
    assert!(stored == pwd, E_Not_Equal_Pwd);
    *stored = new_pwd;
}