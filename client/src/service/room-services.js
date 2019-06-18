import axios from "axios";

export default class services {
  constructor() {
    this.service = axios.create({
      baseURL: `${process.env.REACT_APP_URL}rooms/`
    });
  }

  getAllRooms = () => {
    return this.service
      .get("getAllRooms", { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log("Error", err));
  };

  getOneRoom = id => {
    return this.service
      .get(`getOneRoom/${id}`, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log("Error", err));
  };

  postRoom = room => {
    return this.service
      .post("newRoom", room, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err));
  };

  updateRoom = (id, passValue) => {
    return this.service
      .put(`updateRoom/${id}`, passValue)
      .then(res => res.data)
      .catch(err => console.log("Error", err));
  };

  handleUpload = theFile => {
    return this.service
      .post("/upload", theFile, { withCredentials: true })
      .then(res => res.data)
      .catch(err => console.log(err));
  };
}
