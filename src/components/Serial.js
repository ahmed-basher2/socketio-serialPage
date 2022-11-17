/** @format */

import React, { useMemo, useRef } from 'react';
import io from 'socket.io-client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const socket = io('https://saferoadfmssocketio-hcr64pytia-uc.a.run.app/', {
  auth: {
    token: '111',
    userid: 'sub',
  },
});

const Serial = () => {
  const params = useParams();
  const { serialId } = params;
  // console.log(diff)

  const [data, setData] = useState({});
  const [isChanged, setIsChanged] = useState({
    color: 'red',
    fontWeight: 'bold',
  });
  const [dateDiff, setDateDiff] = useState('');
  const prevData = useRef({});
  // let changes = {};
  useEffect(() => {
    prevData.current = data;
  }, [data]);

  let changeColor = useMemo(() => {
    return {};
  }, []);
  for (const key in data) {
    if (prevData.current[key] !== data[key]) {
      changeColor = { ...changeColor, [key]: true };
    }
  }
  useEffect(() => {
    socket.emit('subscribe', `{"leave":false,"keys":["${serialId}"]}`);
    socket.on('joined', (msg) => {
      console.log(msg);
    });
  }, [serialId]);
  useEffect(() => {
    socket.on('onChange', (ddd) => {
      let dateFb = `${ddd.RecordDateTime}.000Z`;
      let changefb = new Date(dateFb);
      let dataNow = new Date();
      let diff = dataNow - changefb;
      setDateDiff('delay in secound  ' + Math.round(diff / 1000));
      if (changeColor) {
        setIsChanged({ color: 'red', fontWeight: 'bold' });
      }
      setTimeout(() => {
        setIsChanged({ color: 'black', fontWeight: 'normal' });
      }, 1000);
      setData(ddd);
    });
  }, [changeColor]);

  return (
    <>
      <Table
        striped
        bordered
        hover
        size='sm'
      >
        <thead>
          <tr>
            <th>keys</th>
            <th>values</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data) &&
            Object.entries(data).map((item) => {
              const [key, value] = item;
              return (
                <>
                  {value !== null && (
                    <tr key={key}>
                      <td>{key}</td>
                      <td style={changeColor[key] && isChanged}>
                        {value === true
                          ? 'true'
                          : value === false
                          ? 'false'
                          : key === 'RecordDateTime'
                          ? value + ` (${dateDiff})`
                          : value}
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
        </tbody>
      </Table>
      {Object.keys(data).length ? (
        <div
          key={data.SerialNumber}
          style={{
            textAlign: 'center',
          }}
        >
          <h1>SerialNumber : {data.SerialNumber}</h1>
          <h2 style={changeColor?.RecordDateTime && isChanged}>
            RecordDateTime :{data.RecordDateTime}
          </h2>
          <h2 style={changeColor?.Address && isChanged}>
            Address :{data.Address}
          </h2>
          <h2 style={changeColor?.Longitude && isChanged}>
            Longitude : {data.Longitude}
          </h2>
          <h2 style={changeColor?.Latitude && isChanged}>
            Latitude : {data.Latitude}
          </h2>
          <h2 style={changeColor?.Speed && isChanged}>Speed : {data.Speed}</h2>
          <h2 style={changeColor?.Direction && isChanged}>
            Direction : {data.Direction}
          </h2>
        </div>
      ) : (
        <p>there is no data</p>
      )}
    </>
  );
};

export default Serial;
