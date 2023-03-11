import { Col, Pagination, Row } from 'antd'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersListAdmin } from '../../stores/actions/usersAdmin.action'
import UsersList from './components/users-list/UsersList'
import "./users.scss"
function Users() {
  const dispatch = useDispatch()
  const usersAdminState = useSelector((state) => state.usersAdmin);
  const { listUsers, pagination } = usersAdminState;
  const { page, limit, total } = pagination;
  useEffect(() => {
    dispatch(fetchUsersListAdmin({ page: 1, limit: 10 }));
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page])
  return (
    <>
    <div className='users'>
      <div className="users-container">
        <div className="users-body">
          <div className="users-body__heading">
            <Row justify="space-between"
              align="middle"
              gutter={[16, 16]}
              className="center-text">
              <Col span={3}>STT</Col>
              <Col span={4}>Họ</Col>
              <Col span={3}>Tên</Col>
              <Col span={4}>Số điện thoại</Col>
              <Col span={4}>Email</Col>
              <Col span={3}>Role</Col>
              <Col span={3}>Action</Col>
            </Row>
          </div>
          <UsersList />
        </div>
        
      </div>
    </div>
    <div className="users-footer">
        <Pagination
            onChange={(page, pageSize) => {

              dispatch(
                fetchUsersListAdmin({

                  page: page,
                  limit: pageSize,
                })
              );
            }}
            current={Number(page)}
            total={Number(total)}
            pageSize={Number(limit)}
          />
        </div>
    </>
  )
}

export default Users