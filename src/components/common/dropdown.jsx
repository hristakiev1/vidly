import React from "react";

const Dropdown = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

// ({ label, id, error, options, ...rest }) => {
//   return (
//     <div className="form-group">
//       <label htmlFor={id}>{label}</label>
//       <select className="form-control" name={id} id={id} {...rest}>
//         <option value="" />
//         {options.map((option) => (
//           <option key={option._id} value={option._id}>
//             {option.name}
//           </option>
//         ))}
//       </select>
//       {error && <div className="alert alert-danger">{error}</div>}
//     </div>
//   );
// };

export default Dropdown;
