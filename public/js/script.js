$(function () {
  //==========================================================================================================================
  //GLOBAL EMPTY VARIABLES
  //==========================================================================================================================

  let editId;
  let deleteId;
  let name = "";
  let startDate = "";
  let endDate = "";
  let price = 0.0;
  let frequency = "";
  let subStore = [];
  var audioElementMoo = new Audio("../sounds/cowmoo.mp3");
  var audioElementRooster = new Audio("../sounds/cockadoodle.mp3");

  //==========================================================================================================================
  //FUNCTIONS FOR CRUD FUNCTIONALITY
  //==========================================================================================================================

  //CREATE NEW SUBSCRIPTION - front end api call that sends user generated data to server
  const createSubscription = (payload) => {
    $.ajax({
        method: "POST",
        url: "/api/subscriptions",
        data: payload,
      })
      .then(() => {
        // navigate to "/"
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  //SHOW ALL SUBSCRIPTIONS - front end api call that fetches all data from the database and appends to page
  //--------------------------------------------------------------------------------------------------------------------------
  const fetchSubscriptions = () => {
    $.ajax({
        method: "GET",
        url: "/api/subscriptions",
      })
      .then((subscriptions) => {
        console.log(subscriptions);

        // append new node for each subscription
        subscriptions.forEach((subscription) => {
          // destructure subscription
          const {
            id,
            name,
            startDate,
            endDate,
            price,
            frequency,
          } = subscription;
          var icon;
          switch (name) {
            case "Netflix" || "netflix":
              icon =
                "https://mk0knowtechie1qof48y.kinstacdn.com/wp-content/uploads/2014/08/netflix-icon.jpg";
              break;
            case "Hulu" || "hulu":
              icon = "https://www.freeiconspng.com/uploads/hulu-icon-9.png";
              break;
            case "ESPN" || "espn" || "Espn":
              icon =
                "https://cdn.iconscout.com/icon/free/png-512/espn-1-461787.png";
              break;
            case "ArcGIS" || "arcgis" || "ARCGIS" || "ArcGis":
              icon =
                "https://upload.wikimedia.org/wikipedia/commons/d/df/ArcGIS_logo.png";
              break;
            case "Disney+" || "disney+":
              icon =
                "https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/product_image_aspect_switcher_170w/public/product-images/csm-app/disney-app-product-image.png?itok=PvLVdrzm";
              break;
            case "Amazon" || "Amazon Prime" || "amazon prime":
              icon =
                "https://images-na.ssl-images-amazon.com/images/I/411j1k1u9yL._SY450_.png";
              break;
            default:
              icon = "/img/renoosterlogo.png";
          }

          // format subscription as bootstrap card
          const card = `
                    <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <div class="card">
                            <div class="card-body">
                              <img src=${icon} width="150" height="150">
                                <h5 class="card-title">${name}</h5>
                                <p class="card-text">Start Date: <i>${startDate}</i></p>
                                <p class="card-text">End Date: <i>${endDate}</i></p>
                                <p class="card-text">Price: <i>${price}</i></p>
                                <p class="card-text">Frequency: <i>${frequency}</i></p>
                                <button class="btn btn-secondary editBtn" id="${id}">Edit</button>
                                <!-- Button trigger modal -->
                                <button type="button" class="btn btn-danger deleteBtn" data-toggle="modal" data-target="#deleteModal" id="${id}">
                                  Delete
                                </button>
                            </div>
                        </div>
                    </div>
                `;

          // append card to dom
          $("#subscriptions").append(card);
          subStore.push(subscription);
          localStorage.setItem("savedSubs", JSON.stringify(subStore));
        });
      })
      .catch((err) => console.log(err));
  };

  //SHOW ALL EXPIRING SOON SUBSCRIPTIONS - front end api call that fetches date specific data from the database and appends to page
  //--------------------------------------------------------------------------------------------------------------------------
  const expireSubscriptions = () => {
    $.ajax({
        method: "GET",
        url: "/api/subscriptions/expire",
      })
      .then((subscriptions) => {
        console.log("expiring soon:");
        console.log(subscriptions);
        // append new node for each subscription
        subscriptions.forEach((subscription) => {
          // destructure subscription
          const {
            id,
            name,
            startDate,
            endDate,
            price,
            frequency,
          } = subscription;
          var icon;
          switch (name) {
            case "Netflix" || "netflix":
              icon =
                "https://mk0knowtechie1qof48y.kinstacdn.com/wp-content/uploads/2014/08/netflix-icon.jpg";
              break;
            case "Hulu" || "hulu":
              icon = "https://www.freeiconspng.com/uploads/hulu-icon-9.png";
              break;
            case "ESPN" || "espn" || "Espn":
              icon =
                "https://cdn.iconscout.com/icon/free/png-512/espn-1-461787.png";
              break;
            case "ArcGIS" || "arcgis" || "ARCGIS" || "ArcGis":
              icon =
                "https://upload.wikimedia.org/wikipedia/commons/d/df/ArcGIS_logo.png";
              break;
            case "Disney+" || "disney+":
              icon =
                "https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/product_image_aspect_switcher_170w/public/product-images/csm-app/disney-app-product-image.png?itok=PvLVdrzm";
              break;
            case "Amazon" || "Amazon Prime" || "amazon prime":
              icon =
                "https://images-na.ssl-images-amazon.com/images/I/411j1k1u9yL._SY450_.png";
              break;
            default:
              icon = "/img/renoosterlogo.png";
          }
          // format subscription as bootstrap card
          const expiringCards = `
                  <div class="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                      <div class="card">
                          <div class="card-body">
                          <img src=${icon} width="150" height="150">
                              <h5 class="card-title">${name}</h5>
                              <p class="card-text">Start Date: <i>${startDate}</i></p>
                              <p class="card-text expireWarning">End Date: <i>${endDate}</i></p>
                              <p class="card-text">Price: <i>${price}</i></p>
                              <p class="card-text">Frequency: <i>${frequency}</i></p>
                              <button class="btn btn-secondary editBtn" id="${id}">Edit</button>
                              <button class="btn btn-danger deleteBtn" id="${id}">Delete</button>
                          </div>
                      </div>
                  </div>
              `;
          console.log("appending to page....");
          //clear the page

          // append cards to dom
          $("#subscriptions").append(expiringCards);
          subStore.push(subscription);
          localStorage.setItem("savedSubs", JSON.stringify(subStore));
        });
      })
      .catch((err) => console.log(err));
  };

  //UPDATE SUBSCRIPTION - front end api call that allows user to update data in database by ID
  //--------------------------------------------------------------------------------------------------------------------------
  const updateSubscription = (payload) => {
    console.log(payload);
    $.ajax({
        method: "PUT",
        url: "/api/edit/" + payload.id,
        data: payload,
      })
      .then(() => {
        // navigate to "/"
        window.location.href = "/";
      })
      .catch((err) => console.log(err));
  };

  //DELETE SUBSCRIPTION - front end api call that allows user to delete data from database by ID
  //--------------------------------------------------------------------------------------------------------------------------
  const deleteSubscription = (deleteId) => {
    console.log(deleteId);
    $.ajax({
      method: "DELETE",
      url: "/api/subscriptions/" + deleteId,
      data: deleteId,
    }).then(() => {
      console.log("You deleted subscription with id: " + deleteId);
      location.reload();
    });
  };

  //==========================================================================================================================
  //EVENT HANDLERS
  //==========================================================================================================================

  //ADDING A NEW SUBSCRIPTION
  //--------------------------------------------------------------------------------------------------------------------------
  // handle change event for adding subscription name
  $("#name").on("change", (event) => {
    // destructure event
    name = event.target.value;
  });

  // handle change event for adding start date
  $("#startDate").on("change", (event) => {
    // destructure event
    startDate = event.target.value;
  });

  // handle change event for adding end date
  $("#endDate").on("change", (event) => {
    // destructure event
    endDate = event.target.value;
  });

  // handle change event for adding price
  $("#price").on("change", (event) => {
    // destructure event
    price = event.target.value;
  });

  // handle change event for adding frequency
  $("#frequency").on("change", (event) => {
    // destructure event
    frequency = event.target.value;
  });

  // handle submit event
  $("#addSubForm").on("submit", (event) => {
    // prevent default
    event.preventDefault();
    console.log("new subscription added");
    // create payload
    const payload = {
      name: name,
      startDate: startDate,
      endDate: endDate,
      price: price,
      frequency,
    };
    // create subscription
    createSubscription(payload);
  });

  //EDITING A SUBSCRIPTION
  //--------------------------------------------------------------------------------------------------------------------------

  //event handler for editBtn
  $("div").on("click", ".editBtn", (event) => {
    console.log("gonna edit a sub");
    console.log(event.target.id);
    var id = event.target.id;
    editId = id;
    console.log(editId);
    event.stopPropagation();

    $.ajax({
      method: "GET",
      url: "/edit/" + id,
      data: id,
    }).then((subscriptions) => {
      console.log(subscriptions);
      window.location.href = `/edit/${id}`;
    });
  });

  // handle change event for updating subscription name
  $("#edit-name").on("change", (event) => {
    // destructure event
    name = event.target.value;
  });

  // handle change event for updating start date
  $("#edit-startDate").on("change", (event) => {
    // destructure event
    startDate = event.target.value;
  });

  // handle change event for updating end date
  $("#edit-endDate").on("change", (event) => {
    // destructure event
    endDate = event.target.value;
  });

  // handle change event for updating price
  $("#edit-price").on("change", (event) => {
    // destructure event
    price = event.target.value;
  });
  // handle change event for updating frequency
  $("#edit-frequency").on("change", (event) => {
    // destructure event
    frequency = event.target.value;
  });

  // handle edit event (submit update form)
  $("#editSubForm").on("submit", (event) => {
    // prevent default
    event.preventDefault();
    //grab the id from the button
    console.log("button clicked");
    // create payload
    console.log(editId); //---undefined
    if (!name) {
      name = localStorage.getItem("name");
    }
    if (!startDate) {
      startDate = localStorage.getItem("startDate");
    }
    if (!endDate) {
      endDate = localStorage.getItem("endDate");
    }
    if (!price) {
      price = localStorage.getItem("price");
    }
    if (!frequency) {
      frequency = localStorage.getItem("frequency");
    }
    const payload = {
      id: $("#editSubmitBtn").attr("data"),
      name: name,
      startDate: startDate,
      endDate: endDate,
      price: price,
      frequency: frequency,
    };
    console.log(payload);
    updateSubscription(payload);
  });

  //DELETING A SUBSCRIPTION
  //--------------------------------------------------------------------------------------------------------------------------
  //event handler for deleteBtn
  $(document).on("click", ".deleteBtn", (event) => {
    console.log("gonna delete a sub");
    console.log(event.target.id);
    var id = event.target.id;
    deleteId = id;
    console.log(deleteId);
    $("#deleteModal").modal("show");
    audioElementMoo.play();
  });

  // when user clicks "yes" on warning modal delete subscription
  $(".yesBtn").on("click", function (event) {
    console.log(event.target);
    event.preventDefault();
    deleteSubscription(deleteId);
  });

  //EXPIRING SOON
  //--------------------------------------------------------------------------------------------------------------------------
  //event handler for expireBtn
  $("div").on("click", "#expireBtn", (event) => {
    event.stopPropagation();
    $("#subscriptions").empty();

    expireSubscriptions();
    $("#expireModal").modal("toggle");
    audioElementRooster.play();
  });

  //==========================================================================================================================
  //FUNCTION TO POPULATE PAGE
  //==========================================================================================================================
  // call function to render all existing subscription records to page
  fetchSubscriptions();
});