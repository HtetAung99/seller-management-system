const PriceRequested = ({ record }) => {
  return (
    <table style={{ width: '100%' }}>
      <tbody>
        <tr>
          <td style={{ display: 'flex', textAlign: 'right' }}>
            <div
              style={{
                float: 'left',
                textAlign: 'left',
              }}
            >
              {`${(+record.price).toLocaleString('en-US')} Ks`}
            </div>
            <div style={{ marginInline: 20 }}>&gt;</div>
            <div
              style={{
                float: 'right',
                textAlign: 'right',
                color: '#FF7A00',
              }}
            >
              {(+record.price_requested).toLocaleString('en-US')} Ks
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default PriceRequested;
