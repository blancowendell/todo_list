// import React from 'react';
// import { Drawer, Button, Select, Input, message } from 'antd';

// const { Option } = Select;

// const TodoDrawer = ({
//   visible,
//   onClose,
//   onSubmit,
//   title,
//   setTitle,
//   userId,
//   setUserId,
//   users
// }) => {
//   const handleSubmit = () => {
//     if (!title || !userId) {
//       message.error('Please enter a title and select an employee.');
//       return;
//     }
//     onSubmit();
//   };

//   const handleSelectChange = (value) => {
//     setUserId(value || undefined);
//   };

//   return (
//     <Drawer
//       title="Create Todo"
//       placement="right"
//       onClose={onClose}
//       open={visible}
//       width={350}
//     >
//       <div className="space-y-4">
//         <div>
//           <label className="block mb-1 text-sm text-gray-700">Title</label>
//           <Input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Enter todo title"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 text-sm text-gray-700">Assign To</label>
//           <Select
//             value={userId || undefined}
//             onChange={handleSelectChange}
//             placeholder="Select employee"
//             className="w-full"
//           >
//             {users.map((user) => (
//               <Option key={user.userId} value={user.userId}>
//                 {user.username}
//               </Option>
//             ))}
//           </Select>
//         </div>

//         <Button type="primary" block onClick={handleSubmit}>
//           Create Todo
//         </Button>
//       </div>
//     </Drawer>
//   );
// };

// export default TodoDrawer;


import React from 'react';
import { Drawer, Button, message } from 'antd';

const TodoDrawer = ({ visible, onClose, onSubmit, children }) => {
  const handleSubmit = () => {
    if (!children) {
      message.error('Form is missing.');
      return;
    }
    onSubmit();
  };

  return (
    <Drawer
      title="Create Todo"
      placement="right"
      onClose={onClose}
      open={visible}
      width={350}
    >
      <div className="space-y-4">
        {children}

        <Button type="primary" block onClick={handleSubmit}>
          Create Todo
        </Button>
      </div>
    </Drawer>
  );
};

export default TodoDrawer;
