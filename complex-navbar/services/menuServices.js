// ! /services/menuService.js
export async function fetchMenuMetadata(){
    // TODO: handled as a JSON instead of a DATABASE call

    return [
        {
            "id": "dashboard",
            "label": "Dashboard",
            "icon": "home",
            "path": "/dashboard",
            "roles": [
                "admin",
                "user"
            ],
            "children": []
        },
                {
            "id": "data",
            "label": "Data",
            "icon": "home",
            "path": "/data",
            "roles": [
                "admin",
                "user"
            ],
            "children": []
        },
                {
            "id": "about-us",
            "label": "About us!",
            "icon": "home",
            "path": "/about-us",
            "roles": [
                "admin",
                "user"
            ],
            "children": []
        },
        {
            "id": "users",
            "label": "Users",
            "icon": "users",
            "path": "/users",
            "roles": [
                "admin"
            ],
            "children": [
                {
                    "id": "user-list",
                    "label": "User List",
                    "path": "/users/list"
                },
                {
                    "id": "add-user",
                    "label": "Add User",
                    "path": "/users/add"
                }
            ]
        }
    ];
}