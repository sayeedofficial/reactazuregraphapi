import axios from "axios";
import React from "react";
import Member from "./Member";
import "./Members.css";

class Members extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      arrData: [],
    };
  }

  async componentDidMount() {
    let recData = [];
    const url =
      "https://graph.microsoft.com/v1.0/groups/{2c54b9dd-407c-4442-afdf-94e9728fd2fc}/members";
    const access_token =
      "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im45TDVlQVFHc3gzUWNucFFMX0NaT2pObjE4QnVDM0JmbUJrTThrQ3NZVDgiLCJhbGciOiJSUzI1NiIsIng1dCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyIsImtpZCI6ImpTMVhvMU9XRGpfNTJ2YndHTmd2UU8yVnpNYyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9hZWRlMmJkYy0zOGQ3LTQ0YWMtOGI2NC1lZTFjY2I1ZGRkM2QvIiwiaWF0IjoxNjQ3NTI5NDQ3LCJuYmYiOjE2NDc1Mjk0NDcsImV4cCI6MTY0NzUzNDcwMSwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFWUUFxLzhUQUFBQTBiaWNXdEtqakpPaHBnL3VkVFFHQXBCUVFWR2xwcEs3WmhDTXNneHlaSExQUXhFNkhHRmRGbXBrbEFRN3l6RFlybVB4ckphMzVFaDZPT2RxeEtBV0hlVWtJbzRCSVZNUHNNcFBmdVRiOEZvPSIsImFtciI6WyJwd2QiLCJtZmEiXSwiYXBwX2Rpc3BsYXluYW1lIjoiR3JhcGggRXhwbG9yZXIiLCJhcHBpZCI6ImRlOGJjOGI1LWQ5ZjktNDhiMS1hOGFkLWI3NDhkYTcyNTA2NCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiayIsImdpdmVuX25hbWUiOiJzaW5kaHVyYSIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjE1Ny40NS4xODguMTEyIiwibmFtZSI6InNpbmRodXJhIGsiLCJvaWQiOiJhMTc0ODkyNC1kYjRkLTRjMDItODc1YS1kODY1YTNkYzFiY2UiLCJwbGF0ZiI6IjMiLCJwdWlkIjoiMTAwMzIwMDFFMUM0RDQ0QSIsInJoIjoiMC5BWEVBM0N2ZXJ0YzRyRVNMWk80Y3kxM2RQUU1BQUFBQUFBQUF3QUFBQUFBQUFBQ0hBSW8uIiwic2NwIjoiQXBwbGljYXRpb24uUmVhZC5BbGwgRGlyZWN0b3J5LlJlYWQuQWxsIEdyb3VwLlJlYWQuQWxsIEdyb3VwLlJlYWRXcml0ZS5BbGwgR3JvdXBNZW1iZXIuUmVhZC5BbGwgR3JvdXBNZW1iZXIuUmVhZFdyaXRlLkFsbCBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzdWIiOiJxV0s4WXRVT05CTHRtSjZLOXpsMk5YRG9MQnBrUE1PUkpfNURLZGRuTGxNIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkFTIiwidGlkIjoiYWVkZTJiZGMtMzhkNy00NGFjLThiNjQtZWUxY2NiNWRkZDNkIiwidW5pcXVlX25hbWUiOiJzaW5kaHVyYWtAU0lUNjA2Lm9ubWljcm9zb2Z0LmNvbSIsInVwbiI6InNpbmRodXJha0BTSVQ2MDYub25taWNyb3NvZnQuY29tIiwidXRpIjoiNG1BbDRNR3ZNVUd4VDNDeUM3VnVBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19zdCI6eyJzdWIiOiJ4Z19TUWxEb2VSVE5xeEZkZ0Z3ZGw0WVhDbE9nNHhIZlp2SjNBRDBsT2JNIn0sInhtc190Y2R0IjoxNjQ2NTQ3NTY4fQ.JKAd4KbrFS3fT_wSCjr95AItx-7hX_UxhONIf3XUC8tJdmLbe-q0rV9_vUOlJ1JfDu0gWH4w6I-_Pktd65HNQHwYArJfSEqBFhg9PSDvnX4NgoKBCxQHyoiPSboYSpYHwUoOvJI4dbtKxDI6c1la6Mct9DQd1Uw5M_tcSRKPUmoBs9PTfufBz4MzNPnnfTQr9y26_hqpNSDb2FXrLPJ58uPdu8ChKy2dizKTX_a-dHBDwisXvEpAXUviQQvQ0WiscNg-lXEN0B0w2DMEf75txXx2iiWPSoUbphw8gQg4JtXyI-Mxr0jJSXqhvIYAjb80sQnc1KjfhvJRKm7RyJmFVg";
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    recData = res.data.value;
    this.setState({ arrData: recData });
  }

  render() {
    return (
      <div className="members-cards">
        {this.state.arrData.map((e) => (
          <Member email={e.mail} />
        ))}
      </div>
    );
  }
}
export default Members;
