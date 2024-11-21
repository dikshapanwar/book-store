import React, { useState, useEffect } from 'react';
import getBaseUrl from '../../../utils/baseUrl';

function Subscribe() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all subscriptions when the component is mounted
  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await fetch(`${getBaseUrl()}/api/subscribe/all`);

        if (!response.ok) {
          throw new Error('Failed to fetch subscriptions');
        }
        const data = await response.json();
        setSubscriptions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <div>Loading subscriptions...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>All Subscriptions</h1>
      {subscriptions.length === 0 ? (
        <p>No subscriptions found.</p>
      ) : (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Email</th>
              <th>Subscribed At</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub, index) => (
              <tr key={sub._id}>
                <td>{index + 1}</td>
                <td>{sub.email}</td>
                {/* Assuming sub.createdAt is the timestamp of subscription */}
                <td>{new Date(sub.subscribedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Subscribe;
