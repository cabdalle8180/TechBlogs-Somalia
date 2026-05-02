import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import { TbTrash, TbPlus, TbShieldCheck, TbShieldOff, TbUserCheck, TbUserX } from "react-icons/tb";

function Users() {
  const currentUser = useSelector((state) => state.user?.currentUser);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    if (!currentUser?.isAdmin) return; 
    try {
      setLoading(true);
      const res = await fetch("/api/users/getAllUsers", { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Waan ku guuldareysan nay inaan keeno users-ka");
      setUsers(data?.data || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentUser]);

  // Shaqadan waxay qabataa labadii shaqo ee hore (Update Role & Status)
  const handleUpdate = async (id, updates) => {
    try {
      const res = await fetch(`/api/users/updateUserRole/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Cusboonaysiintu way fashilantay");
      
      toast.success("Si guul leh ayaa loo cusboonaysiiyay");
      fetchUsers(); 
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Ma hubtaa inaad tirtirto user-kan?")) return;
    try {
      const res = await fetch(`/api/users/deleteUser/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Tirtiristu way fashilantay");
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("Si guul leh ayaa loo tirtiray");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
  }, [users]);

  if (loading && users.length === 0) return <div className="text-center p-10">Waa la soo raryaa...</div>;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold">User <span className="text-indigo-600">Management</span></h1>
        {/* <Link to="/dashboard/create-user" className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-xl">
          <TbPlus /> Ku dar User
        </Link> */}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4 text-xs font-semibold uppercase">Users</th>
              <th className="p-4 text-xs font-semibold uppercase">Created At</th>
              <th className="p-4 text-xs font-semibold uppercase text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sortedUsers.map((user) => (
              <tr key={user._id} className="hover:bg-slate-50">
                <td className="p-4">
                  <div className="font-bold">{user.username}</div>
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="p-4 text-sm text-gray-400">
                  {moment(user.createdAt).format("MMM DD, YYYY")}
                </td>
                <td className="p-4 flex justify-center gap-2">
                  <button 
                    onClick={() => handleUpdate(user._id, { isAdmin: user.isAdmin, isActived: !user.isActived })}
                    className={`px-3 py-1 rounded-lg text-xs ${user.isActived ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                  >
                    {user.isActived ? "Active" : "Disabled"}
                  </button>
                  <button 
                    onClick={() => handleUpdate(user._id, { isActived: user.isActived, isAdmin: !user.isAdmin })}
                    className={`px-3 py-1 rounded-lg text-xs ${user.isAdmin ? "bg-amber-100 text-amber-600" : "bg-slate-100 text-slate-600"}`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </button>
                  <button onClick={() => handleDelete(user._id)} className="text-red-500 p-2"><TbTrash size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;