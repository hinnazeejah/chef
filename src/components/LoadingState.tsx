const LoadingState: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-shimmer bg-[length:400%_100%]" />
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-shimmer bg-[length:400%_100%] rounded" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-shimmer bg-[length:400%_100%] rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}; 