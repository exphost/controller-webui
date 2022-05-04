import React from 'react'

function UserInfo(props) {
    const groups = []
    if(props.user.groups)
        props.user.groups.forEach((group) => groups.push(<option key={group} value={group}>{group}</option>))
    return (
        <React.Fragment>
        userinfo
        <ul>
            <li>login: {props.user.login}</li>
            <li>sn: {props.user.sn}</li>
            <li>gn: {props.user.gn}</li>
            <li>org: <select name='q'>
                {groups}
                </select>
        </li>
        </ul>
        </React.Fragment>

    )
}

export default UserInfo;
