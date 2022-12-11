/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React, {useEffect} from "react";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// reactstrap components
import {
  UncontrolledAlert,
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

import CheckCard from "../components/CheckCard/CheckCard";


// Create a card for each check
// Create a button to run the check
// Create a button to view the check history


const CheckListContext = React.createContext({
  checkList: [], fetchCheckList: () => {}
})


const CategoryListContext = React.createContext({
  categoryList: [], fetchCategoryList: () => {}
})

function Checks() {
  const notificationAlert = React.useRef();
  const notify = (place) => {
    var color = Math.floor(Math.random() * 5 + 1);
    var type;
    switch (color) {
      case 1:
        type = "primary";
        break;
      case 2:
        type = "success";
        break;
      case 3:
        type = "danger";
        break;
      case 4:
        type = "warning";
        break;
      case 5:
        type = "info";
        break;
      default:
        break;
    }
    var options = {};
    options = {
      place: place,
      message: (
        <div>
          <div>
            Welcome to <b>Paper Dashboard React</b> - a beautiful freebie for
            every web developer.
          </div>
        </div>
      ),
      type: type,
      icon: "nc-icon nc-bell-55",
      autoDismiss: 7
    };
    notificationAlert.current.notificationAlert(options);
  };

 // Create an API call to get the list of checks
  const [checkList, setCheckList] = React.useState({});
  const fetchCheckList  = async () => {
    const response = await fetch('http://127.0.0.1:8000/check/list/');
    const data = await response.json();
    setCheckList(data.data);

    for (let i = 0; i < data.data.length; i++) {
      if (!categoryList.includes(data.data[i].category)) {
        categoryList.push(data.data[i].category);
      }
    }
    // console.log(data.data);
    // console.log(categoryList);
  }

  // TODO: Maybe just do this in Python instead of JS
  //  Need to return a list of categories
  const [categoryList, setCategoryList] = React.useState({});
    const fetchCategoryList  = async () => {
        fetchCheckList();
       for (let i = 0; i < checkList.length; i++) {
          if (!categoryList.includes(checkList[i].category)) {
            categoryList.push(checkList[i].category);
          }
        }
    }

    useEffect(() => {
      fetchCheckList()
    }, [])

  return (
    <>
      <CheckListContext.Provider value={{checkList, fetchCheckList}}>
        <CategoryListContext.Provider value={{categoryList, fetchCategoryList}}>
          <div className="content">
          <NotificationAlert ref={notificationAlert} />
          <Row>
            <Col md="12">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Checks</CardTitle>
                     <p>Check the status of your system by running these checks</p>
                 </CardHeader>
                 <CardBody>
                {/*   For each entry in categoryList, create a new <Card>*/}
                  {/*   For each entry in checkList, create a new <CheckCard> if check.category is equal to category*/}
                   {console.log(categoryList)}
                  {categoryList.map((category) => (
                      console.log(category),
                      <p>test</p>
                      // <Card className="card-check m-1">
                      //     <CardBody>
                      //         <h5>{category}</h5>>
                      //         {checkList.map((check) => (
                      //             // if (check.category === category)
                      //             <CheckCard/>
                      //
                      //         ))}
                      //     </CardBody>
                      // </Card>
                  ))}


                {/* Using the data from checkList, map a new <Card> for each checkList.category and map a <CheckCard> for each item */}
                {/*  {checkList.map((category) => (*/}
                {/*      <div>*/}
                {/*          <h3>{category.category}</h3>*/}
                {/*          {category.checks.map((check) => (*/}
                {/*              <CheckCard check={check}/>*/}
                {/*          ))}*/}
                {/*      </div>*/}
                {/*  ))}*/}

                  {/*<Row>*/}
                  {/*  <Col md="6">*/}
                  {/*    <CheckCard/>*/}
                  {/*    </Col>*/}
                  {/*</Row>*/}
                </CardBody>
              </Card>
            </Col>
          </Row>
          {/* Next section below */}
          <Row>
                <Col md="12">
                <Card>
                <CardBody>
                <div className="places-buttons">
                <Row>
                <Col className="ml-auto mr-auto text-center" md="6">
                <CardTitle tag="h4">Notifications Places</CardTitle>
                <p className="category">Click to view notifications</p>
                </Col>
                </Row>
                <Row>
                <Col className="ml-auto mr-auto" lg="8">
                <Row>
                <Col md="4">
                <Button
                block
                color="primary"
                onClick={() => notify("tl")}
                >
                Top Left
                </Button>
                </Col>
                <Col md="4">
                <Button
                block
                color="primary"
                onClick={() => notify("tc")}
                >
                Top Center
                </Button>
                </Col>
                <Col md="4">
                <Button
                block
                color="primary"
                onClick={() => notify("tr")}
                >
                Top Right
                </Button>
                </Col>
                </Row>
                </Col>
                </Row>
                <Row>
                <Col className="ml-auto mr-auto" lg="8">
                <Row>
                <Col md="4">
                <Button
                block
                color="primary"
                onClick={() => notify("bl")}
                >
                Bottom Left
                </Button>
                </Col>
                <Col md="4">
                <Button
                block
                color="primary"
                onClick={() => notify("bc")}
                >
                Bottom Center
                </Button>
                </Col>
                <Col md="4">
                <Button
                block
                color="primary"
                onClick={() => notify("br")}
                >
                Bottom Right
                </Button>
                </Col>
                </Row>
                </Col>
                </Row>
                </div>
                </CardBody>
                </Card>
                </Col>
                </Row>
        </div>
          </CategoryListContext.Provider>
        </CheckListContext.Provider>

    </>
  );
}

export default Checks;
