export default function Background() {
  return (
    <div className="fixed inset-0 z-0 h-full w-full">
      {/* Background Image */}
      <img
        src="/logos/photo-1528722828814-77b9b83aafb2-e1574333496357.jpg"
        alt="Background"
        className="h-full w-full object-cover"
      />
      
      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />
      
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] opacity-60" />
    </div>
  );
}
