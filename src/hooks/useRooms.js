import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { roomsAPI, bookingsAPI } from '../services/api';

export const useRooms = (params = {}) =>
  useQuery({
    queryKey: ['rooms', params],
    queryFn: async () => {
      const { data } = await roomsAPI.getAll(params);
      return data.data.rooms;
    },
  });

export const useLatestRooms = () =>
  useQuery({
    queryKey: ['rooms', 'latest'],
    queryFn: async () => {
      const { data } = await roomsAPI.getLatest();
      return data.data.rooms;
    },
  });

export const useRoom = (id) =>
  useQuery({
    queryKey: ['rooms', id],
    queryFn: async () => {
      const { data } = await roomsAPI.getById(id);
      return data.data.room;
    },
    enabled: Boolean(id),
  });

export const useMyListings = () =>
  useQuery({
    queryKey: ['rooms', 'my-listings'],
    queryFn: async () => {
      const { data } = await roomsAPI.getMyListings();
      return data.data.rooms;
    },
  });

export const useMyBookings = () =>
  useQuery({
    queryKey: ['bookings', 'mine'],
    queryFn: async () => {
      const { data } = await bookingsAPI.getMine();
      return data.data.bookings;
    },
  });

export const useCreateRoom = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => roomsAPI.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

export const useUpdateRoom = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => roomsAPI.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

export const useDeleteRoom = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => roomsAPI.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

export const useCreateBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload) => bookingsAPI.create(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['bookings'] });
      qc.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};

export const useCancelBooking = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id) => bookingsAPI.cancel(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['bookings'] });
      qc.invalidateQueries({ queryKey: ['rooms'] });
    },
  });
};
