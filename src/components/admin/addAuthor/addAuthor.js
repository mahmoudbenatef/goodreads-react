import axios from "axios";
import { useEffect, useState } from "react";
import ErrorComponent from "../../reusableComponents/ErrorComponent";
import UploadImage from "../shared/uploadImage";
import "./addAuthor.css";
// import { Redirect } from 'react-router-dom';

function AddAuthor(props) {
  const [formData, setFormData] = useState(
    props.label === "add"
      ? {
          firstname: "",
          lastname: "",
          dob: "",
          description: "",
          avatar: "",
          role: "author",
        }
      : {
          id: props.myObject.id,
          firstname: props.myObject.firstname,
          lastname: props.myObject.lastname,
          description: props.myObject.description,
          role: "author",
        }
  );
  const HandlerOfImage = (imageFile, imageIsValid) => {
    console.log("imageFile", imageFile);

    setFormData({
      ...formData,
      avatar: imageFile,
    });

    setIs({ ...isValid, avatar: imageIsValid });
  };

  const errorMessages = {
    firstname: "firstname is required and must be more than 2 characters",
    lastname: "lastname is required and must be more than 2 characters",
    dob: "date of birth is required",
    avatar: "you must upload avatar",
    description: "you should enter the decription ",
  };

  const [isValid, setIs] = useState(
    props.label === "add"
      ? {
          firstname: false,
          lastname: false,
          dob: false,
          avatar: false,
          description: false,
        }
      : {
          firstname: true,
          lastname: true,
          dob: true,
          avatar: true,
          description: true,
        }
  );
  useEffect(() => {
    if (formData.firstname !== "" && formData.firstname.length > 2) {
      setIs({ ...isValid, firstname: true });
    }

    if (formData.lastname !== "" && formData.lastname.length > 2) {
      setIs({ ...isValid, lastname: true });
    }
    if (formData.description !== "" && formData.description.length > 2) {
      setIs({ ...isValid, description: true });
    }

    if (formData.dob !== "" && props.label === "add") {
      setIs({ ...isValid, dob: true });
    }
    if (props.label !== "add") {
      setIs({ ...isValid, dob: true });
    }

    if (formData.avatar !== "" && props.label === "add") {
      setIs({ ...isValid, avatar: true });
    }
    if (props.label !== "add") {
      setIs({ ...isValid, avatar: true });
    }
  }, [formData]);

  return (
    <div className=" d-flex flex-column min-vh-100 align-items-center justify-content-center bg-success">
      <form className="form row  align-items-center justify-content-center w-50 p-3 bg-light rounded-3">
        <div className=" justify-content-center ">
          <div className="form-group  ">
            <label>first name</label>
            <input
              type="text"
              className="form-control"
              value={formData.firstname}
              onChange={(event) => {
                setFormData({ ...formData, firstname: event.target.value });
              }}
              placeholder="enter your first name"
            />

            {!isValid.firstname && props.label == "add" ? (
              <ErrorComponent> {errorMessages.firstname}</ErrorComponent>
            ) : (
              ""
            )}
            {formData.firstname.trim() === "" && props.label !== "add" ? (
              <ErrorComponent> {errorMessages.firstname}</ErrorComponent>
            ) : (
              ""
            )}
          </div>
          <div className="form-group  ">
            <div>
              <label className="m-6">description</label>
            </div>

            {/* <input type="text" className="form-control"
                  value={formData.description}  
                  onChange={(event)=>{

                      setFormData({...formData,description : event.target.value})

                  }}
                  
                  placeholder="enter description of thr author"/> */}

            <textarea
              name="desc"
              onChange={(event) => {
                setFormData({ ...formData, description: event.target.value });
              }}
              value={formData.description}
              placeholder="enter description of thr author"
              rows="4"
              cols="50"
            ></textarea>

            {!isValid.description && props.label == "add" ? (
              <ErrorComponent> {errorMessages.description}</ErrorComponent>
            ) : (
              ""
            )}
            {/* { formData.description.trim() === "" &&  props.label !== "add"  ? 

<ErrorComponent > {errorMessages.description}</ErrorComponent> : ""

}  */}
          </div>
          <div className="form-group ">
            <label>last name</label>
            <input
              type="text"
              value={formData.lastname}
              onChange={(event) => {
                setFormData({ ...formData, lastname: event.target.value });
              }}
              className="form-control"
              placeholder="enter your last name"
            />

            {!isValid.lastname && props.label == "add" ? (
              <ErrorComponent> {errorMessages.lastname}</ErrorComponent>
            ) : (
              ""
            )}
            {formData.lastname.trim() === "" && props.label !== "add" ? (
              <ErrorComponent> {errorMessages.lastname}</ErrorComponent>
            ) : (
              ""
            )}
          </div>
          <div className="form-group ">
            <label>date of birth</label>
            <input
              type="date"
              value={formData.DOB}
              onChange={(event) => {
                setFormData({ ...formData, dob: event.target.value });
              }}
              className="form-control"
            />
            {!isValid.dob ? (
              <ErrorComponent> {errorMessages.dob}</ErrorComponent>
            ) : (
              ""
            )}
          </div>

          <div>
            {" "}
            <UploadImage
              uploadInput={(pickedFile, isVlaidImg) => {
                console.log("pickedFile in props", pickedFile);

                HandlerOfImage(pickedFile, isVlaidImg);
              }}
            />
            {!isValid.avatar ? (
              <ErrorComponent> {errorMessages.avatar}</ErrorComponent>
            ) : (
              ""
            )}
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-10 "
          style={{ width: 70 }}
          onClick={(event) => {
            event.preventDefault();

            if (isValid.firstname && isValid.lastname && isValid.dob) {
              console.log("mydata with descripton ", formData);
              const mydata = new FormData();
              for (const [key, value] of Object.entries(formData)) {
                mydata.append(key, value);
              }

              if (props.label === "add") {
                axios
                  .post("http://localhost:3001/authors/", mydata)
                  .then((response) => {
                    console.log("item added successfully");
                    props.clicked("author");
                    // return <Redirect to='/' />
                  });
              } else {
                console.log("item mydata ", formData);

                axios
                  .patch(
                    "http://localhost:3001/authors/" + props.myObject._id,
                    mydata
                  )
                  .then((response) => {
                    console.log("item updated  successfully");
                    props.clicked("author");
                    // return <Redirect to='/' />
                  });
              }
            }
          }}
        >
          {props.label}{" "}
        </button>
      </form>
    </div>
  );
}

export default AddAuthor;
