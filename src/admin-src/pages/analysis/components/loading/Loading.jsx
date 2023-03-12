import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const antIcon = (
   <LoadingOutlined
      style={{
         fontSize: 30,
      }}
      spin
   />
);

export const Loading = () => {
   return (
      <div className="loadingSymbol" style={{width:'fit-content',height: '100px', margin: 'auto'}}>
         <br />
         <Spin indicator={antIcon} />
      </div>
   )
}