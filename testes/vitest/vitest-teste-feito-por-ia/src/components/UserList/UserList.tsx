import type { ChangeEvent } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteUser, listUsers } from "../../api/userApi";
import {
  EMAIL_MAX_LENGTH,
  NAME_MAX_LENGTH,
  type User,
  type UserFilterValues,
} from "../../types/user";
import DeleteIcon from "../Icon/DeleteIcon";
import EditIcon from "../Icon/EditIcon";
import "./UserList.css";

const EMPTY_FILTER: UserFilterValues = { name: "", email: "" };
const FEEDBACK_TIMEOUT_MS = 2500;

/** Message handed over by UserForm after a successful save. */
interface UserListLocationState {
  feedback?: string;
}

function matchesFilter(user: User, filter: UserFilterValues): boolean {
  const name = filter.name.trim().toLowerCase();
  const email = filter.email.trim().toLowerCase();

  if (name.length > 0 && !user.name.toLowerCase().includes(name)) {
    return false;
  }

  if (email.length > 0 && !user.email.toLowerCase().includes(email)) {
    return false;
  }

  return true;
}

function UserList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState<UserFilterValues>(EMPTY_FILTER);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [failure, setFailure] = useState("");

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setFailure("");

    try {
      const data = await listUsers();
      setUsers(data);
    } catch {
      setFailure("Could not load users. Check if the API is running.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadUsers();
  }, [loadUsers]);

  useEffect(() => {
    const state = location.state as UserListLocationState | null;

    if (state?.feedback === undefined) {
      return;
    }

    setFeedback(state.feedback);
    void navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    if (feedback === "") {
      return;
    }

    const timer = setTimeout(() => {
      setFeedback("");
    }, FEEDBACK_TIMEOUT_MS);

    return () => {
      clearTimeout(timer);
    };
  }, [feedback]);

  const visibleUsers = useMemo(
    () => users.filter((user) => matchesFilter(user, filter)),
    [users, filter],
  );

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFilter({ ...filter, [name]: value });
  }

  function handleFilterClear() {
    setFilter(EMPTY_FILTER);
  }

  async function handleDelete(user: User) {
    setFeedback("");
    setFailure("");

    try {
      await deleteUser(user.id);
      setFeedback(`User #${user.id} deleted.`);
      await loadUsers();
    } catch {
      setFailure(`Could not delete user #${user.id}.`);
    }
  }

  return (
    <section className="user-list">
      <div className="user-list__header">
        <h1>Users</h1>
        <Link className="user-list__new" to="/users/new">
          New user
        </Link>
      </div>

      <div className="user-list__filter">
        <div className="user-list__filter-field">
          <label htmlFor="filter-name">Name</label>
          <input
            id="filter-name"
            name="name"
            type="text"
            value={filter.name}
            onChange={handleFilterChange}
            maxLength={NAME_MAX_LENGTH}
            placeholder="Filter by name"
          />
        </div>

        <div className="user-list__filter-field">
          <label htmlFor="filter-email">E-mail</label>
          <input
            id="filter-email"
            name="email"
            type="email"
            value={filter.email}
            onChange={handleFilterChange}
            maxLength={EMAIL_MAX_LENGTH}
            placeholder="Filter by e-mail"
          />
        </div>

        <div className="user-list__filter-actions">
          <button
            type="button"
            className="button--ghost"
            onClick={handleFilterClear}
          >
            Clear
          </button>
        </div>
      </div>

      {feedback && <p className="user-list__feedback">{feedback}</p>}
      {failure && <p className="user-list__failure">{failure}</p>}

      {loading && <p>Loading&hellip;</p>}
      {!loading && users.length === 0 && <p>No users found.</p>}
      {!loading && users.length > 0 && visibleUsers.length === 0 && (
        <p>No users match the filter.</p>
      )}

      {visibleUsers.length > 0 && (
        <table className="user-list__table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>E-mail</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {visibleUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="user-list__row-actions">
                  <Link
                    className="user-list__icon user-list__icon--edit"
                    to={`/users/${user.id}/edit`}
                    title={`Edit ${user.name}`}
                    aria-label={`Edit ${user.name}`}
                  >
                    <EditIcon />
                  </Link>
                  <button
                    type="button"
                    className="user-list__icon user-list__icon--delete"
                    onClick={() => void handleDelete(user)}
                    title={`Delete ${user.name}`}
                    aria-label={`Delete ${user.name}`}
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default UserList;
