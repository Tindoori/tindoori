import React, { useEffect, useState } from "react";
import "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  ListGroupItem,
  ListGroup,
  Form,
  Button,
  Modal,
} from "react-bootstrap";
import firebase from "firebase";
import * as PropTypes from "prop-types";
import ReactCardFlip from "react-card-flip";
import "./RecipeDetail.css";
import { useHistory } from "react-router-dom";

export default function RecipeDetail({ match }) {
  const [recipe, setRecipe] = useState();
  const [showDeleteButton, setShowDeleteButton] = useState(false);
  const [showModal, setModal] = useState(false);
  const recipeid = match.params.id;
  const db = firebase.firestore();
  const currentUser = firebase.auth().currentUser.uid;
  const [isFlipped, setIsFlipped] = useState(false);
  const handleCloseModal = () => setModal(false);
  const handleShowModal = () => setModal(true);
  const history = useHistory();

  useEffect(() => {
    db.collection("recipe")
      .doc(recipeid)
      .get()
      .then((doc) => {
        setRecipe(doc.data());
      });

    db.collection("recipe")
      .doc(recipeid)
      .get()
      .then((snapshot) => {
        if (currentUser === snapshot.data().createdBy) {
          setShowDeleteButton(true);
        }
      });
  }, [db, recipeid, currentUser]);

  const handleRotate = (e) => {
    e.preventDefault();
    setIsFlipped((prev) => !prev);
  };

  function deleteRecipe(recipeId) {
    db.collection("recipe").doc(recipeId).delete();
    history.push("/created");
  }

  return (
    <>
      <div id="recipe-detail-container">
        <Form.Label>
          Click on the card to view the remaining recipe details.
        </Form.Label>
        {recipe && (
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div role="tabpanel" onClick={handleRotate} aria-hidden="true">
              <Card id="recipe-detail-card">
                <Card.Img id="recipe-detail-img" src={recipe.imgPath} />
                <Card.Body>
                  <Card.Title>{recipe.name}</Card.Title>
                  <Card.Text>{recipe.description}</Card.Text>
                  <ListGroupItem>
                    <Card.Text id="recipe-detail-description">
                      Allergies: {recipe.allergy}
                    </Card.Text>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Card.Text id="recipe-detail-description">
                      Diet preference: {recipe.dietary}
                    </Card.Text>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Card.Text className="recipe-detail-description">
                      Type of meal: {recipe.mealtype}
                    </Card.Text>
                  </ListGroupItem>
                  <ListGroupItem>
                    <Card.Text className="recipe-cook-time">
                      Cooking time: {recipe.cookingTime} min
                    </Card.Text>
                  </ListGroupItem>
                </Card.Body>
                {showDeleteButton && (
                  <Button
                    id="recipe-detail-delete"
                    variant="danger"
                    onClick={handleShowModal}
                  >
                    Delete
                  </Button>
                )}
              </Card>
            </div>
            <div role="tabpanel" onClick={handleRotate} aria-hidden="true">
              <Card id="recipe-detail-card">
                <Card.Body>
                  <Card.Header>Ingredients</Card.Header>
                  <ListGroup variant="flush">
                    {recipe.ingredients.map((ingredient) => (
                      <ListGroupItem key={ingredient}>
                        {ingredient}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                  <br />
                  <Card.Header>Steps</Card.Header>
                  <ListGroup variant="flush">
                    {recipe.steps.map((steps) => (
                      <ListGroupItem key={steps}>{steps}</ListGroupItem>
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
          </ReactCardFlip>
        )}
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Deleted recipes can no longer be accessed anymore
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="danger" onClick={() => deleteRecipe(recipeid)}>
            Delete anyway
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

RecipeDetail.propTypes = {
  match: PropTypes.instanceOf(Object).isRequired,
};
