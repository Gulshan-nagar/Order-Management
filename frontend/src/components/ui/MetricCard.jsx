const MetricCard = ({ label, value, icon, bg }) => (
  <div className={`flex items-center p-4 rounded-lg shadow ${bg}`}>
    <div className="text-2xl mr-4">{icon}</div>
    <div>
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);
export default MetricCard;
