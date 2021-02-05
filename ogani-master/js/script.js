//Signup function
function signup() {
  var firstName = document.getElementById("firstName").value;
  var verifFirstName = verifLength(firstName, 3);
  if (verifFirstName) {
    document.getElementById("firstNameError").innerHTML = "";
  } else {
    document.getElementById("firstNameError").innerHTML =
      "First Name must have at least 5 characters";
    document.getElementById("firstNameError").style.color = "red";
  }
  var lastName = document.getElementById("lastName").value;
  var verifLastName = verifLength(lastName, 3);
  if (verifLastName) {
    document.getElementById("lastNameError").innerHTML = "";
  } else {
    document.getElementById("lastNameError").innerHTML =
      "Last Name must have at least 3 characters";
    document.getElementById("lastNameError").style.color = "red";
  }
  var email = document.getElementById("email").value;
  var verifEmail = validateEmail(email);
  if (verifEmail) {
    document.getElementById("emailError").innerHTML = "";
  } else {
    document.getElementById("emailError").innerHTML = "Format Invalid";
    document.getElementById("emailError").style.color = "red";
  }
  var pwd = document.getElementById("pwd").value;
  var verifPwd = verifLength(pwd, 3);
  if (verifPwd) {
    document.getElementById("pwdError").innerHTML = "";
  } else {
    document.getElementById("pwdError").innerHTML =
      "Password must have at least 8 characters";
    document.getElementById("pwdError").style.color = "red";
  }
  var confirmPwd = document.getElementById("confirmPwd").value;
  if (confirmPwd === pwd) {
    document.getElementById("confirmPwdError").innerHTML = "";
  } else {
    document.getElementById("confirmPwdError").innerHTML = "Password not match";
    document.getElementById("confirmPwdError").style.color = "red";
  }
  var tel = document.getElementById("tel").value;
  if (tel.length === 8) {
    document.getElementById("telError").innerHTML = "";
  } else {
    document.getElementById("telError").innerHTML =
      "Tel number must have 8 characters";
    document.getElementById("telError").style.color = "red";
  }
  if (
    verifFirstName &&
    verifLastName &&
    verifEmail &&
    verifPwd &&
    pwd === confirmPwd &&
    tel.length === 8
  ) {
    var idUser = JSON.parse(localStorage.getItem("idUser") || "5");

    var user = {
      id: idUser,
      firstName: firstName,
      lastName: lastName,
      email: email,
      pwd: pwd,
      confirmPwd: confirmPwd,
      tel: tel,
      role: "user",
    };
    var users = JSON.parse(localStorage.getItem("users") || "[]");
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("idUser", idUser + 1);
    location.replace("index.html");
  }
}
function verifLength(ch, nb) {
  return ch.length > nb;
}
function validateEmail(email) {
  const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regExp.test(String(email).toLowerCase());
}
//---------------
////////////////////////// Fonction "insert Admins"
function insertAdmins() {
  var users = JSON.parse(localStorage.getItem('users') || '[]');
  var admin1 = { id: 1, firstName: 'Hanene', lastName: 'Trabelsi', email: 'admin1@admin.com', pwd: 'hanene12345', tel: '24161617', role: 'admin' };
  var admin2 = { id: 2, firstName: 'Sana', lastName: 'Chaifia', email: 'admin2@admin.com', pwd: 'sana12345', tel: '96547230', role: 'admin' };
  users.push(admin1);
  users.push(admin2);

  localStorage.setItem('users', JSON.stringify(users));
  localStorage.setItem('adminAdded', 'true');       // Pour ne pas répeter tout le temps, "les admins" dans "localStorage"

}
//----------------------------------------------
//function login
function login() {
  var email = document.getElementById("emailLogin").value;
  var pwd = document.getElementById("pwdLogin").value;
  var users = JSON.parse(localStorage.getItem("users"));
  var findedUser;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email && users[i].pwd === pwd) {
      findedUser = users[i];
  } else {
      document.getElementById('notFindError').innerHTML =
          'User not find';
      document.getElementById('notFindError').style.color = 'red';
  }}
  if (findedUser.role === "admin") {
    localStorage.setItem("connectedUser", JSON.stringify(findedUser));
    location.replace("admin.html");
  } else {
    localStorage.setItem("connectedUser", JSON.stringify(findedUser));
    location.replace("index.html");
  }
}
///--------------Function to add product in the dashboard
function addProduct() {
  // Get value from input
  var productName = document.getElementById("productName").value;
  //var prDate = document.getElementById("prDate").value;
  // verif if productname > 6
  var verifProductName = verifLength(productName, 6);
  // verif if product exists to use function searchProduct
  var verifIfPrExist = searchProduct(productName);
  if (verifIfPrExist) {
    document.getElementById("productNameExistError").innerHTML =
      "Product already exists";
    document.getElementById("productNameExistError").style.color = "red";
  } else {
    document.getElementById("productNameError").innerHTML = "";
  }
  if (verifProductName) {
    document.getElementById("productNameError").innerHTML = "";
  } else {
    document.getElementById("productNameError").innerHTML =
      "Product Name must have at least 6 characters";
    document.getElementById("productNameError").style.color = "red";
  }
  var price = document.getElementById("price").value;
  var verifPrice = price > 0;
  if (verifPrice) {
    document.getElementById("priceError").innerHTML = "";
  } else {
    document.getElementById("priceError").innerHTML =
      "Price must be greater then 0";
    document.getElementById("priceError").style.color = "red";
  }
  var stock = document.getElementById("stock").value;
  var verifStock = stock > 10;
  if (verifStock) {
    document.getElementById("stockError").innerHTML = "";
  } else {
    document.getElementById("stockError").innerHTML = "Invalid stock (>10)";
    document.getElementById("stockError").style.color = "red";
  }
  var category = document.getElementById("category-select").value;

  if (
    verifProductName &&
    verifPrice &&
    verifStock &&
    !verifIfPrExist
  ) {
    var idProduct = JSON.parse(localStorage.getItem("idProduct") || "1");
    var product = {
      id: idProduct,
      productName: productName,
      price: price,
      stock: stock,
      category: category,
      //prDate: prDate
    };
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("idProduct", idProduct + 1);
    location.replace("admin.html");
  }
}
// ----function to search product exist
function searchProduct(x) {
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  var prExist = false;
  for (let i = 0; i < products.length; i++) {
    if (products[i].productName === x) {
      prExist = true;
    }
  }
  return prExist;
}
//--------------------------------------------------
// THis functions allows to display dynamically products from LS to affiched in the dashboard
function displayProducts() {
  var products = JSON.parse(localStorage.getItem("products"));

  var productTable = `
    <table class="table table-striped">

                                        <tr>
										<th>position</th>
										<th>Name</th>
										<th>Price</th>
										<th>Stock</th>
										<th>Category</th>
										<th style="texte-center">Actions</th>
                  </tr>`;

  for (let i = 0; i < products.length; i++) {
    var productTable =
      productTable +
      `									
									<tr>
										<td>${i}</td>
										<td>${products[i].productName}</td>
										<td>${products[i].price}</td>
										<td>${products[i].stock}</td>
										<td>${products[i].category}</td>
                    <td>
											<button class="site-btn" onclick="editProduct(${products[i].id})">Edit</button>
                      <button class="site-btn" onclick="deleteObject(${i}, 'products')">Delete</button>
										</td>
									</tr>
                                `;
  }
  var productTable = productTable + `</table>`;
  document.getElementById("prTable").innerHTML = productTable;
}
//---function onclik in the button displayProduct to redirect to page details product

function displayProductDetails(id) {
  localStorage.setItem("idPr", id);
  location.replace("display-product.html");
}
///----------------------function to modify the price and the stock of the product
function editProduct(x) {
  var pr = searchById(x, "products");
  var editForm = `
   
							<div class="col-md-12 form-group">
								<input type="text" class="form-control" id="editPrice" name="name" value=${pr.price} placeholder="Price" >
              </div>
              <span id='priceEditError'></span>
              <div class="col-md-12 form-group">
								<input type="text" class="form-control" id="editStock" name="name" value=${pr.stock} placeholder="Stock" >
              </div>
              <span id='stockEditError'></span>
							<div class="col-md-12 form-group">
								<button type="submit" value="submit" onclick="validateEdit(${pr.id})" class="site-btn">Edit product</button>
                            </div>`;
  document.getElementById("editFormProduct").innerHTML = editForm;
}
//----
function searchById(x, T) {
  var objects = JSON.parse(localStorage.getItem(T) || "[]");
  var obj;
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id === x) {
      obj = objects[i];
    }
  }
  return obj;
}
//----Function to insert the new price and stock-------------------

function validateEdit(id) {
  var newPrice = document.getElementById("editPrice").value;
  var verifPrice = newPrice > 0;
  if (verifPrice) {
    document.getElementById("priceEditError").innerHTML = "";
  } else {
    document.getElementById("priceEditError").innerHTML =
      "Price must be greater then 0";
    document.getElementById("priceEditError").style.color = "red";
  }
  var newStock = document.getElementById("editStock").value;

  var verifStock = newStock > 10;
  if (verifStock) {
    document.getElementById("stockEditError").innerHTML = "";
  } else {
    document.getElementById("stockEditError").innerHTML =
      "Stock must be greater then 10";
    document.getElementById("stockEditError").style.color = "red";
  }
  if (verifPrice && verifStock) {
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === id) {
        products[i].price = newPrice;
        products[i].stock = newStock;
      }
    }
    localStorage.setItem("products", JSON.stringify(products));
    location.reload();
  }
}
//---------Function to delete product in the dashbord---------------
function deleteObject(x, T) {
  var objects = JSON.parse(localStorage.getItem(T) || "[]");
  objects.splice(x, 1);
  localStorage.setItem(T, JSON.stringify(objects));
  location.reload();
}
function displaySearchedProduct() {
  var idPr = localStorage.getItem("idPr");
  var searchedPr = searchById(Number(idPr), "products");
  document.getElementById("prName").innerHTML = searchedPr.productName;
  document.getElementById("prPrice").innerHTML = searchedPr.price;
  document.getElementById("prStock").innerHTML = searchedPr.stock;
}
// THis functions allows to display dynamically attributs products from LS
function displayShopProducts() {
  var products = JSON.parse(localStorage.getItem("products"));
  var productTable = ``;
  for (let i = 0; i < products.length; i++) {
    var productTable =
      productTable +
      `									
      <div class="col-lg-4 col-md-6 col-sm-6">
    <div class="product__item">
        <div class="product__item__pic set-bg" data-setbg="img/tente3.jpg">
            <ul class="product__item__pic__hover">
                <li><a href="#"><i class="fa fa-heart"></i></a></li>
                <li><a href="#"><i class="fa fa-retweet"></i></a></li>
                <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
            </ul>
        </div>
        <div class="product__item__text">
            <h6><a>${products[i].productName}</a></h6>
            <h6> Price: ${products[i].price}</h6>
            <h6 class="l-through">Stock: ${products[i].stock}</h6>
        </div>
    
            <button class="site-btn" onclick="goToReservation(${products[i].id})" style="border-radius: 0px; width: 100%; ">Reserve</button>
        
    </div>
</div>
                                `;
  }
  document.getElementById("shop").innerHTML = productTable;
}
function goToReservation(id) {
  localStorage.setItem("idPrToReserve", id);
  location.replace("display-product.html");
}
function displayProductToReserve() {
  var idPr = localStorage.getItem("idPrToReserve");
  var searchedPr = searchById(Number(idPr), "products");
  document.getElementById("prToReserveName").innerHTML = searchedPr.productName;
  document.getElementById("prToReservePrice").innerHTML =
    searchedPr.price + " DT";
  document.getElementById("prToReserveStock").innerHTML =
    searchedPr.stock + " Pieces";
}


////
function displayUsers() {
  var users = JSON.parse(localStorage.getItem("users"));

  var userTable = `
      <table class="table table-striped">
  
                                          <tr>
                                          <th>First Name</th>
                                          <th>Last Name</th>
                                          <th>Email</th>
                                          <th>Tel</th>
                                          <th>Actions</th>
                                      </tr>`;
  for (let i = 0; i < users.length; i++) {
    var userTable =
      userTable +
      `									
                                      <tr>
                                          <td>${users[i].firstName}</td>
                                          <td>${users[i].lastName}</td>
                                          <td>${users[i].email}</td>
                                          <td>${users[i].tel}</td>
                                          <td>
                                              <button class="site-btn " onclick="displayUserDetails(${users[i].id})" >Display</button>
                                              <button class="site-btn" onclick="editUser(${users[i].id})" >Edit</button>
                                              <button class="site-btn " onclick="deleteObject(${i}, 'users')">Delete</button>
                                          </td>
                                      </tr>
                                  `;
  }
  var userTable = userTable + `</table>`;
  document.getElementById("userTable").innerHTML = userTable;
}
function displayUserDetails(id) {
  localStorage.setItem("idUser", id);
  location.replace("display-user.html");
}
function editUser(id) {
  var user = searchById(id, "users");
  var editForm = `
   
							<div class="col-md-12 form-group">
								<input type="password" class="form-control" id="editPwd" name="name" value=${user.pwd} placeholder="Price" >
              </div>
              <div class="col-md-12 form-group">
								<input type="password" class="form-control" id="editConfirmPwd" name="name" value=${user.confirmPwd} placeholder="Stock" >
              </div>
              <div class="col-md-12 form-group">
								<input type="text" class="form-control" id="editTel" name="name" value=${user.tel} placeholder="Stock" >
              </div>
							<div class="col-md-12 form-group">
								<button type="submit" value="submit" onclick="validateEditUser(${user.id})" class="site-btn">Edit User</button>
                            </div>`;
  document.getElementById("editFormUser").innerHTML = editForm;
}
function displaySearchedUser() {
  var idUser = localStorage.getItem("idUser");
  var searchedUser = searchById(Number(idUser), "users");
  document.getElementById("userName").innerHTML =
    searchedUser.firstName + " " + searchedUser.lastName;
  document.getElementById("userTel").innerHTML = searchedUser.tel;
  document.getElementById("userEmail").innerHTML = searchedUser.email;
}

function searchById(x, T) {
  var objects = JSON.parse(localStorage.getItem(T) || "[]");
  var obj;
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id === x) {
      obj = objects[i];
    }
  }
  return obj;
}

function displayPrInfo() {
  var id = localStorage.getItem('idPrToReserve');//get product to reserve
  var pr = searchById(Number(id), 'products');// search product to reserve in all product
  document.getElementById('prName').innerHTML = pr.productName;//affiche name in html
  document.getElementById('prPrice').innerHTML = pr.price;//affiche price in html
  document.getElementById('prStock').innerHTML = pr.stock;//affiche price in htm
}
//function to replace to shoping-cart after clicked in aad cart
function validateReservation() {
  var qty = document.getElementById("prToReserveQty").value;
  var idPr = localStorage.getItem("idPrToReserve");


 
  var searchedPr = searchById(Number(idPr), "products");
  if (Number(qty) <= Number(searchedPr.stock) && Number(qty) > 0) {
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    var idOrder = JSON.parse(localStorage.getItem("idOrder") || "1");

    var order = {
      id: idOrder,
      qty: qty,
      idPr: idPr,
      idUser: connectedUser.id,
   

    };
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("idOrder", idOrder + 1);

    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === Number(idPr)) {
        products[i].stock = Number(products[i].stock) - Number(qty);
      }
    }
    localStorage.setItem("products", JSON.stringify(products));
    location.replace("shoping-cart.html");
  } else {
    document.getElementById("qtyError").innerHTML = "Invalid Quantity";
    document.getElementById("qtyError").style.color = "red";
  }
}
//////function to display the orders's of connectedUser (shoping-cart.html)
function basket() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  var myOrders = [];
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].idUser === connectedUser.id) {
      myOrders.push(orders[i]);
    }
  }
  var orderTable = `<table>
  <thead>
      <tr>
          <th class="shoping__product">Product</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>`;
  var sum = 0;
  for (let i = 0; i < myOrders.length; i++) {
    var pr = searchById(Number(myOrders[i].idPr), "products");
    var totalPrPrice = Number(pr.price) * Number(myOrders[i].qty);
    sum = sum + totalPrPrice;
    orderTable =
      orderTable +
      ` <tr>
      <td class="shoping__cart__item">
          <img src="img/navire.jpg" style="width:200px" alt="">
          <h5>${pr.productName}</h5>
      </td>
      <td class="shoping__cart__price">
      <h5>${pr.price} DT</h5>
      </td>
      <td >
      <h5>${myOrders[i].qty} </h5>
      </td>
      <td class="shoping__cart__total">
      </h5>${totalPrPrice} Dt</h5>
      </td>
      <td class="shoping__cart__item__close">
      <button class="site-btn" onclick="deleteOrder(${searchObjectPosition(myOrders[i].id, "orders")}, ${myOrders[i].id})"   >Delete</button>
      </td>
      <td>
        
        <button class="site-btn" onclick="editOrder(${myOrders[i].id})">Edit</button>
    </td>
  </tr> 

`;
  }

  orderTable +=`</tbody></table>`
    orderTable +=
    `
    <div class="col-lg-12">
    <div class="shoping__checkout">
        <h5>Cart Total</h5>
        <ul>
            <li>Subtotal <span>${sum}</span></li>
          
        </ul>
    </div>
</div>

</tbody>
</table>`;

  document.getElementById("orderTableHTML").innerHTML = orderTable;
  document.getElementById("somme").innerHTML = "( " +sum+ " )";

}
function searchObjectPosition(id, T) {
  var objects = JSON.parse(localStorage.getItem(T) || "[]");
  var index;
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].id === id) {
      index = i;
    }
  }
  return index;
}
///function delete Order onclick button in shoping-cart.html
function deleteOrder(position, id) {
  var order = searchById(Number(id), "orders");
  var qty = order.qty;
  var products = JSON.parse(localStorage.getItem("products") || "[]");
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === Number(order.idPr)) {
      products[i].stock = products[i].stock + Number(qty);
    }
  }
  localStorage.setItem("products", JSON.stringify(products));
  deleteObject(position, "orders");
}
//function edit Order onclick button in shoping-cart.html
function editOrder(id) {
  var order = searchById(id, "orders");
  var editFormOrder = `
   
							<div class="col-md-12 form-group">
								<input type="number" class="form-control" id="editQty" name="name" value=${order.qty} placeholder="Price" >
              </div>
              <span id='qtyEditError'></span>
							<div class="col-md-12 form-group">
								<button type="submit" value="submit" onclick="validateEditOrder(${order.id})" class="site-btn">Edit Order</button>
                            </div>`;
  document.getElementById("editFormOrderHTML").innerHTML = editFormOrder;
}
function validateEditOrder(id) {
  var newQty = document.getElementById("editQty").value;
  var order = searchById(id, "orders");
  var product = searchById(Number(order.idPr), "products");
  var diff = Number(newQty) - order.qty;
  if (product.stock < diff) {
    document.getElementById("qtyEditError").innerHTML = "Invalid stock";
    document.getElementById("qtyEditError").style.color = "red";
  } else {
    // update order
    var orders = JSON.parse(localStorage.getItem("orders") || "[]");
    for (let i = 0; i < orders.length; i++) {
      if (orders[i].id === id) {
        orders[i].qty = Number(newQty);
      }
    }
    localStorage.setItem("orders", JSON.stringify(orders));
    // update product stock
    var products = JSON.parse(localStorage.getItem("products") || "[]");
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === Number(order.idPr)) {
        products[i].stock = products[i].stock - Number(diff);
      }
    }
    localStorage.setItem("products", JSON.stringify(products));

    location.reload();
  }
}
/////function to search category in shop.html and replace to result .html
function searchPr(event) {
  var key = event.keyCode;
  if (key === 13) {
    var categoryToSearch = document.getElementById("categoryToSearch").value;
    localStorage.setItem("category", categoryToSearch);

    location.replace("result.html");
  }

}
// function to display product by category in result.html
function displayProductsByCategory() {
  var products = JSON.parse(localStorage.getItem("products") || '[]');
  var category = localStorage.getItem("category");
  var searchProducts = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].category === category) {
      searchProducts.push(products[i]);
    }
  }
  var productTable = ``;
  for (let i = 0; i < searchProducts.length; i++) {
    var productTable =
      productTable +
      `									
      <!-- single product -->
      <div class="col-lg-4 col-md-6">
          <div class="single-product">
              <img class="img-fluid" src="img/product/details/product-details-1.jpg" alt="">
              <div class="product-details">
                  <h6>Nom du produt :${searchProducts[i].productName}</h6>
                  <div class="price">
                      <h6>Prix: ${searchProducts[i].price}</h6>
                      <h6 class="l-through"> Stock: ${searchProducts[i].stock}</h6>
                  </div>

              </div>
              <button class="site-btn" onclick="goToReservation(${searchProducts[i].id})" style="border-radius: 0px; width: 100%; ">Reserve</button>
          </div>
      </div>
                                `;
  }
  document.getElementById("result").innerHTML = productTable;
}
///Add a number of orders in bag
function orderNbr() {
  var orders = JSON.parse(localStorage.getItem("orders") || "[]");
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var orderNbr = 0;
  for (let i = 0; i < orders.length; i++) {
    if (orders[i].idUser === connectedUser.id) {
      // orderNbr = orderNbr + 1;
      orderNbr += 1;
    }
  }
  document.getElementById("ordersNbrHTML").innerHTML =  orderNbr ;
}
////
function setHeader() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  if (connectedUser) {

    if (connectedUser.role === 'admin') {
      var header = `
      <nav class="header__menu">
                        <ul>
      <li class="active"><a href="./index.html">Home</a></li>
     
          <li class="active"><a href="./add-product.html">Add-product</a></li>
          
          <li class="active"><a href="./admin.html">Dashboard</a></li>
          
          <li class="active"><a href="./add-event.html">Add-event</a></li>
          <li class="active"><a href=""onclick="logout()">Logout</a></li>
          <li class="active"><a id="connectedUserName"></a></li> 
          </ul> 
          </nav>   
      
   `;
      document.getElementById("headerId").innerHTML = header;
      document.getElementById("connectedUserName").innerHTML =
        connectedUser.firstName + " " + connectedUser.lastName;
    } else {

      var cartSearch = `
     
      <ul>
          <li><a href="#"><i class="fa fa-heart"></i> <span id="ordersNbrHTML" style="width:20px;" ></span></a></li>
 
      <li><a href="#"><i class="fa fa-shopping-bag"></i> <span id="eventOrdersNbrHTML"style="width:20px;" ></span></a></li>
      </ul>
      <div class="header__cart__price">item: <span>150.00 dt</span></div>
  </div>`
      document.getElementById('cartSearchHTML').innerHTML = cartSearch;
  
      var header = `
      <nav class="header__menu">
       <ul>
      <li class="active"><a href="./index.html">Home</a></li>
      <li><a href="./shop.html">Shop</a></li>  
      <li><a href="./event.html">Event</a></li>             
          <li class="active"><a onclick="logout()">Logout</a></li>
          <li class="active"><a id="connectedUserName"></a></li>
          <li class="active"><a href="./contact.html">Contact</a></li>
          </ul>
          </nav> `;
      document.getElementById("headerId").innerHTML = header;
      document.getElementById("connectedUserName").innerHTML =
        connectedUser.firstName + " " + connectedUser.lastName;
    }

  } else {
    var header = `
    <nav class="header__menu">
                        <ul>
    <li class="active"><a href="./index.html">Home</a></li>
      <li><a href="./shop.html">Shop</a></li> 
      <li class="active"><a href="./event.html">Event</a></li>             
          <li class="active"><a href="./login.html">Login</a></li>
          <li class="active"><a href="./signup.html">Signup</a></li>
          </ul>
          </nav>
        
  `;
    document.getElementById("headerId").innerHTML = header;

  }


}
///
function logout() {
  localStorage.removeItem("connectedUser");
  location.replace('index.html');
}

// function getTimeRemaining(endtime) {
//   const total = Date.parse(endtime) - Date.parse(new Date());
//   const seconds = Math.floor((total / 1000) % 60);
//   const minutes = Math.floor((total / 1000 / 60) % 60);
//   const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
//   const days = Math.floor(total / (1000 * 60 * 60 * 24));

//   return {
//     total,
//     days,
//     hours,
//     minutes,
//     seconds
//   };
// }

// function initializeClock(id, endtime) {
//   const clock = document.getElementById(id);
//   const timeinterval = setInterval(() => {
//     const t = getTimeRemaining(endtime);
//     clock.innerHTML = 'days: ' + t.days + '<br>' +
//       'hours: ' + t.hours + '<br>' +
//       'minutes: ' + t.minutes + '<br>' +
//       'seconds: ' + t.seconds;
//     if (t.total <= 0) {
//       clearInterval(timeinterval);
//     }
//   }, 1000);
// }
//---------------event process---------------------------------------
function addEvent() {
  //get value from input
  var eventName = document.getElementById('eventName').value;

  var verifEventName = verifLength(eventName, 6);
  if (verifEventName) {

    document.getElementById('eventNameError').innerHTML = '';
  } else {
    document.getElementById('eventNameError').innerHTML =
      'Event Name must have at least 6 characters';
    document.getElementById('eventNameError').style.color = 'red';
  }
  var destination = document.getElementById('destination').value;
  var verifDestination = (destination.length !== 0);
  if (verifDestination) {
    document.getElementById('destinationError').innerHTML = '';
  } else {
    document.getElementById('destinationError').innerHTML =
      'Invalide destination';
    document.getElementById('destinationError').style.color = 'red';
  }
  var disponibility = document.getElementById('disponibility').value;
  var verifDisponibility = (disponibility > 5);
  if (verifDisponibility) {
    document.getElementById('disponibilityError').innerHTML = '';
  } else {
    document.getElementById('disponibilityError').innerHTML =
      'Number of places (must be greater than 5)';
    document.getElementById('disponibilityError').style.color = 'red';
  }
  var term = daysDifference();
  var rate = document.getElementById('rate').value;

  if (verifEventName && verifDisponibility && verifDestination) {
    // ajouter l identifianr unique 
    var idEvent = JSON.parse(localStorage.getItem('idEvent') || '1');
    var event = {
      id: idEvent,
      eventName: eventName,
      term: term,
      destination: destination,
      disponibility: disponibility,
      rate: rate,
    }
    var events = JSON.parse(localStorage.getItem('events') || '[]');
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));
    localStorage.setItem('idEvent', idEvent + 1);
    location.replace('admin.html');
  }

}
//----------------------fuction return periode Term---------------------------------------
function daysDifference() {
  //définir deux variables & fetch the input from HTML form
  var dateI1 = document.getElementById("dateInput1").value;
  var dateI2 = document.getElementById("dateInput2").value;

  //définir deux variables d'objet de date pour stocker les valeurs de date
  var date1 = new Date(dateI1);
  var date2 = new Date(dateI2);

  //calc
  var time_difference = date2.getTime() - date1.getTime();

  //calculer la différence de jours en divisant le nombre total de millisecondes par jour
  var result = time_difference / (1000 * 60 * 60 * 24);

  return result;
}
//-----------diplay event at admin dashboard----------------------
function displayEvent() {
  var events = JSON.parse(localStorage.getItem("events"));

  var eventTable = `
    <table class="table table-striped">

                                        <tr>
                                        <th>position</th>
                                        <th>Event</th>
                                        <th>Rate</th>
                                        <th>available places</th>
                                        <th>Term</th>
                                        <th>Destination</th>
                                        <th>Actions</th>
                  </tr>`;

  for (let i = 0; i < events.length; i++) {
    var eventTable =
      eventTable +
      `                 
                                    <tr>
                                        <td>${i}</td>
                                        <td>${events[i].eventName}</td>
                                        <td>${events[i].rate} DT</td>
                                        <td>${events[i].disponibility} Places</td>
                                        <td>${events[i].term} Jours</td>
                                        <td>${events[i].destination}</td>
                    <td>

                                            <button class="site-btn" onclick="editEvent(${events[i].id})">Edit</button>
                      <button class="site-btn" onclick="deleteObject(${i}, 'events')">Delete</button>
                                        </td>
                                    </tr>
                                `;
  }
  var eventTable = eventTable + `</table>`;
  document.getElementById("eventTable").innerHTML = eventTable;
}
//------------------diplay shop event -----------------------------------

function displayShopEvents(id) {
  var events = JSON.parse(localStorage.getItem("events"));
  var eventTable = ``;
  for (let i = 0; i < events.length; i++) {
    var eventTable =
      eventTable +
      `                 
      <div class="col-lg-4 col-md-6">
          <div class="single-event">
              <img class="img-fluid" src="img/wallpaper.jpg" alt="">
              <div class="event-details">
                  <h6 >${events[i].eventName}</h6>
                  <div class="Rate">
                      <h6> Rate: ${events[i].rate} Dt</h6>
                      <h6 class="l-through">Available Places: ${events[i].disponibility}</h6>
                      <h6 class="l-through">Duration: ${events[i].term} jours</h6>
                      <h6 class="l-through">Destination: ${events[i].destination}</h6>

                  </div>

              </div>
              <button class="site-btn" onclick="goToReservationEvent(${events[i].id})" style="border-radius: 0px; width: 100%; ">Reserve</button>
          </div>
      </div>
                                `;
  }
  document.getElementById("shopEvent").innerHTML = eventTable;
}
//----------------------go to diplay event and save id into ls-------------------------------------------------
function goToReservationEvent(id) {
  localStorage.setItem("idEventToReserve", id);
  location.replace('display-event.html');
}
function displaySearchedEvent() {
  var idEvent = localStorage.getItem("idEvent");
  var searchedEvent = searchById(Number(idEvent), "events");
  document.getElementById("eventName").innerHTML = searchedEvent.eventtName;
  document.getElementById("eventRate").innerHTML = searchedEvent.rate;
  document.getElementById("eventDestination").innerHTML = searchedEvent.destination;
  document.getElementById("eventDisponibility").innerHTML = searchedEvent.disponibility;
  document.getElementById("eventTerm").innerHTML = searchedEvent.term;


}
function displayEventToReserve() {
  var idEvent = localStorage.getItem("idEventToReserve");
  var ev = searchById(Number(idEvent), "events");
  document.getElementById("eventToReserveName").innerHTML = ev.eventName;
  document.getElementById("eventToReserveDestination").innerHTML = ev.destination;
  document.getElementById("eventToReserveRate").innerHTML = ev.rate + " DT";
  document.getElementById("eventToReserveDisponibility").innerHTML = ev.disponibility + " places";
}
//function to replace to Event-cart after clicked in add cart
function validateEventReservation() {
  var placeReserve = document.getElementById("eventToReserve").value;
  var idEvent = localStorage.getItem("idEventToReserve");
  console.log('idEvent', idEvent);
  var rate = document.getElementById("eventToReserveRate").value;

  var searchedEvent = searchById(Number(idEvent), "events");
  if (Number(placeReserve) <= Number(searchedEvent.disponibility) && Number(placeReserve) > 0) {
    var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
    var idEventOrder = JSON.parse(localStorage.getItem("idEventOrders") || "1");

    var eventOrder = {
      id: idEventOrder,
      placeReserve: placeReserve,
      rate: rate,
      idEvent: idEvent,
      idUser: connectedUser.id,
    };
    var eventOrders = JSON.parse(localStorage.getItem("eventOrders") || "[]");
    eventOrders.push(eventOrder);
    localStorage.setItem("eventOrders", JSON.stringify(eventOrders));
    localStorage.setItem("idEventOrder", idEventOrder + 1);

    var events = JSON.parse(localStorage.getItem("events") || "[]");
    for (let i = 0; i < events.length; i++) {
      if (events[i].id === Number(idEvent)) {
        events[i].disponibility = Number(events[i].disponibility) - Number(placeReserve);
      }
    }
    localStorage.setItem("events", JSON.stringify(events));
    location.replace("cartEvent.html");
  } else {
    document.getElementById("placesEventError").innerHTML = "Invalid resarvation";
    document.getElementById("placesEventError").style.color = "red";
  }
}
function basketEvent() {
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var eventOrders = JSON.parse(localStorage.getItem("eventOrders") || "[]");
  var myEventOrders = [];
  for (let i = 0; i < eventOrders.length; i++) {
    if (eventOrders[i].idUser === connectedUser.id) {
      myEventOrders.push(eventOrders[i]);
    }
  }
  var EventOrderTable = `<table>
  <thead>
      <tr>
          <th class="shoping__product">Events</th>
          <th>Rate</th>
          <th>Reservation</th>
          <th>Total</th>
          <th>Action</th>
      </tr>
  </thead>
  <tbody>`;
  var sum = 0;
  for (let i = 0; i < myEventOrders.length; i++) {
    var ev = searchById(Number(myEventOrders[i].idEvent), "events");
    var totalevPrice = Number(ev.rate) * Number(myEventOrders[i].placeReserve);
    sum = sum + totalevPrice;
    EventOrderTable =
      EventOrderTable +
      ` <tr>
      <td class="shoping__cart__item">
          <img src="img/event/Event-3.jpg" alt="">
          <h5>${ev.eventName}</h5>
      </td>
      <td class="shoping__cart__price">
      <h5>${ev.rate} DT</h5>
      </td>
      <td >
      <h5>${myEventOrders[i].placeReserve} Places</h5>
      </td>
      <td class="shoping__cart__total">
      </h5>${totalevPrice} Dt</h5>
      </td>
      <td class="shoping__cart__item__close">
      <button class="site-btn" onclick="deleteEventOrder(${searchObjectPosition(myEventOrders[i].id, "eventOrders")}, ${myEventOrders[i].id})"   >Delete</button>
      </td>
      <td>
        
        <button class="site-btn" onclick="editEventOrder(${myEventOrders[i].id})">Edit</button>
    </td>
  </tr> 

`;
  }

  EventOrderTable +=`</tbody></table>`
    EventOrderTable +=
    `
    <div class="col-lg-12">
    <div class="shoping__checkout">
        <h5>Cart Total</h5>
        <ul>
            <li>Subtotal <span>${sum}</span></li>
          
        </ul>
    </div>
</div>

</tbody>
</table>`;

  document.getElementById("eventOrderTableHTML").innerHTML = EventOrderTable;
}
//-------------delete event Order-------------------------------------------------------
function deleteEventOrder(position, id) {
  var eventOrder = searchById(Number(id), "eventOrders");
  var placeReserve = eventOrder.placeReserve;
  var events = JSON.parse(localStorage.getItem("events") || "[]");
  for (let i = 0; i < events.length; i++) {
    if (events[i].id === Number(eventOrder.idEvent)) {
      events[i].disponibility = events[i].disponibility + Number(placeReserve);
    }
  } localStorage.setItem("events", JSON.stringify(events));
  deleteObject(position, "eventOrders");
}
//----------------------------Edit event Order-------------------------------------------
function editEventOrder(id) {
  var eventOrder = searchById(id, "eventOrders");
  var editEventOrder = `
   
							<div class="col-md-12 form-group">
								<input type="number" class="form-control" id="editNbPlaces" name="name" value=${eventOrder.placeReserve} placeholder="reserved Places" >
              </div>
              <span id='placeEditError'></span>
							<div class="col-md-12 form-group">
								<button type="submit" value="submit" onclick="validateEditEventOrder(${eventOrder.id})" class="site-btn">Edit Event Order</button>
                            </div>`;
  document.getElementById("editEventOrderHTML").innerHTML = editEventOrder;
}
//----------------------validate edit order -----------------------------------------
function validateEditEventOrder(id){

    var newPlace = document.getElementById("editNbPlaces").value;
    var eventOrder = searchById(id, "eventOrders");
    var event = searchById(Number(eventOrder.idEvent), "events");
    var diff = Number(newPlace) - eventOrder.placeReserve;
    if (event.disponibility < diff) {
      document.getElementById("placeEditError").innerHTML = "Invalid Place Number";
      document.getElementById("placeEditError").style.color = "red";
    } else {
      // update order
      var eventOrders = JSON.parse(localStorage.getItem("eventOrders") || "[]");
      for (let i = 0; i < eventOrders.length; i++) {
        if (eventOrders[i].id === id) {
          eventOrders[i].placeReserve = Number(newPlace);
        }
      }
      localStorage.setItem("eventOrders", JSON.stringify(eventOrders));
      // update product stock
      var events = JSON.parse(localStorage.getItem("events") || "[]");
      for (let i = 0; i < events.length; i++) {
        if (events[i].id === Number(eventOrder.idEvent)) {
          events[i].disponibility = events[i].disponibility - Number(diff);
        }
      }
      localStorage.setItem("events", JSON.stringify(events));
  
      location.reload();
    }
  }
//------------------compteur sur nombre des commandes de events---------------------
function eventOrderNbr() {
  var eventOrders = JSON.parse(localStorage.getItem("eventOrders") || "[]");
  var connectedUser = JSON.parse(localStorage.getItem("connectedUser"));
  var eventOrderNbr = 0;
  for (let i = 0; i <eventOrders.length; i++) {
    if (eventOrders[i].idUser === connectedUser.id) {
      // orderNbr = orderNbr + 1;
      eventOrderNbr += 1;
    }
  }
  document.getElementById("eventOrdersNbrHTML").innerHTML = eventOrderNbr;
}

