/**
 * Created by Ricardo on 23/05/2017.
 */

export const backendUrl = '';

export function getMyInfo(cb) {

    fetch('/getMyInfo')
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson.result !== 'fail');
            //return responseJson.result !== 'fail';
            cb(responseJson);
        })
        .catch((error) => {
            //return false;
            cb(false);
        });
}

export function setPinState(pinNumber, newPinState, cb) {

    let body = {
        pinNumber: pinNumber,
        newPinState: newPinState
    };
    //console.log(JSON.stringify(body))

    /*
     return $.post('/setPinState', body,
     function (data, status) {
     cb(data);
     });

     */

    fetch('/setPinState', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        }
    ).then ((response) => cb(response.json()));
}


