use ic_cdk::api::time;
use ic_cdk_macros::*;
use std::cell::RefCell;
use std::collections::HashMap;

use candid::{CandidType, Deserialize};
use serde::Serialize;

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct Product {
    pub id: String,
    pub name: String,
    pub description: String,
    pub manufacturer: String,
    pub created_at: u64,
    pub current_location: String,
    pub status: String,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct SupplyEvent {
    pub id: String,
    pub product_id: String,
    pub event_type: String,
    pub location: String,
    pub timestamp: u64,
    pub description: String,
    pub actor: String,
}

#[derive(Clone, Debug, CandidType, Deserialize)]
pub struct User {
    pub id: String,
    pub name: String,
    pub email: String,
    pub role: String,
    pub created_at: u64,
}

thread_local! {
    static PRODUCTS: RefCell<HashMap<String, Product>> = RefCell::new(HashMap::new());
    static EVENTS: RefCell<HashMap<String, Vec<SupplyEvent>>> = RefCell::new(HashMap::new());
    static USERS: RefCell<HashMap<String, User>> = RefCell::new(HashMap::new());
}

#[update]
fn register_product(name: String, description: String, manufacturer: String) -> String {
    let id = format!("prod_{}", time());
    let product = Product {
        id: id.clone(),
        name,
        description,
        manufacturer,
        created_at: time(),
        current_location: "Manufacturing".to_string(),
        status: "Created".to_string(),
    };

    PRODUCTS.with(|products| {
        products.borrow_mut().insert(id.clone(), product);
    });

    id
}

#[query]
fn get_product(id: String) -> Option<Product> {
    PRODUCTS.with(|products| products.borrow().get(&id).cloned())
}

#[query]
fn get_all_products() -> Vec<Product> {
    PRODUCTS.with(|products| products.borrow().values().cloned().collect())
}

#[update]
fn add_supply_event(product_id: String, event_type: String, location: String, description: String, actor: String) -> String {
    let event_id = format!("event_{}", time());
    let event = SupplyEvent {
        id: event_id.clone(),
        product_id: product_id.clone(),
        event_type,
        location: location.clone(),
        timestamp: time(),
        description,
        actor,
    };

    EVENTS.with(|events| {
        let mut events_map = events.borrow_mut();
        events_map.entry(product_id.clone()).or_insert_with(Vec::new).push(event);
    });

    PRODUCTS.with(|products| {
        let mut products_map = products.borrow_mut();
        if let Some(product) = products_map.get_mut(&product_id) {
            product.current_location = location;
            product.status = "In Transit".to_string();
        }
    });

    event_id
}

#[query]
fn get_product_events(product_id: String) -> Vec<SupplyEvent> {
    EVENTS.with(|events| events.borrow().get(&product_id).cloned().unwrap_or_default())
}

#[update]
fn register_user(name: String, email: String, role: String) -> String {
    let id = format!("user_{}", time());
    let user = User {
        id: id.clone(),
        name,
        email,
        role,
        created_at: time(),
    };

    USERS.with(|users| {
        users.borrow_mut().insert(id.clone(), user);
    });

    id
}

#[query]
fn get_user(id: String) -> Option<User> {
    USERS.with(|users| users.borrow().get(&id).cloned())
}

#[query]
fn get_all_users() -> Vec<User> {
    USERS.with(|users| users.borrow().values().cloned().collect())
}

// -------------------------
// Candid UI Support (Option 2 — Certified HTTP interface)
// -------------------------

#[derive(CandidType, Deserialize)]
struct HttpRequest {
    method: String,
    url: String,
    headers: Vec<(String, String)>,
    body: Vec<u8>,
    upgrade: Option<bool>,
}

#[derive(CandidType, Serialize)]
struct HttpResponse {
    status_code: u16,
    headers: Vec<(String, String)>,
    body: Vec<u8>,
}

#[query(name = "http_request")]
#[candid::candid_method(query)]
fn http_request(_req: HttpRequest) -> HttpResponse {
    HttpResponse {
        status_code: 200,
        headers: vec![("Content-Type".to_string(), "text/plain".to_string())],
        body: "Supply Chain Backend is running.".as_bytes().to_vec(),
    }
}
