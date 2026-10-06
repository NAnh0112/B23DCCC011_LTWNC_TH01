import type { ComponentType } from 'react';
import type { LoadStatus } from '../features/deadlines/types';

interface WithLoadingProps {
  status: LoadStatus;
  error?: string;
}

export function withLoading<P extends object>(Wrapped: ComponentType<P>) {
  return function WithLoading(props: P & WithLoadingProps) {
    const { status, error, ...rest } = props;

    if (status === 'idle' || status === 'loading') return <p className="msg">Đang tải danh sách bài tập...</p>;
    if (status === 'failed') return <p className="msg error">Lỗi: {error ?? 'Không tải được dữ liệu'}</p>;

    return <Wrapped {...(rest as unknown as P)} />;
  };
}