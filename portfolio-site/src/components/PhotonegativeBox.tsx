'use client';

interface PhotonegativeBoxProps {
  className?: string;
  children?: React.ReactNode;
}

export default function PhotonegativeBox({ className = '', children }: PhotonegativeBoxProps) {
  return (
    <div 
      className={`
        fixed 
        top-1/2 
        left-1/2 
        -translate-x-1/2 
        -translate-y-1/2 
        w-1/2 
        h-1/2 
        rounded-lg 
        overflow-hidden
        ${className}
      `}
      style={{
        background: 'white',
        mixBlendMode: 'difference',
        zIndex: 1000,
        isolation: 'auto'
      }}
    >
      {children && (
        <div 
          className="w-full h-full flex items-center justify-center p-6"
          style={{
            mixBlendMode: 'difference',
            color: 'white'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
