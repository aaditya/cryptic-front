import React, { useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import qs from "query-string";

import { config } from "../utils/settings";
import { openNotification } from "../components/Notification";

function Activate(props) {
    const { uid, active } = qs.parse(props.location.search);

    useEffect((values) => {
        (async () => {
            try {
                let { data } = await axios.get(`${config.url.API_URL}/api/v1/auth/verify?uid=${uid}&active=${active}`, values);
                openNotification(data.message);
            } catch (err) {
                openNotification(err.response ? err.response.data.message : "Server Error. Please Try Again");
            } finally {
                props.history.push('/');
            }
        })();
    });

    return (
        <p>Please Wait . . .</p>
    )
}

export default withRouter(Activate);