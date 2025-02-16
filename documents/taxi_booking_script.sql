CREATE TABLE `Users` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) UNIQUE NOT NULL,
  `phone` varchar(20) UNIQUE NOT NULL,
  `user_type` enum(passenger,driver) DEFAULT 'passenger',
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `Taxis` (
  `id` integer PRIMARY KEY,
  `driver_id` integer,
  `license_plate` varchar(20) UNIQUE NOT NULL,
  `status` enum(available,on_trip) DEFAULT 'available',
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `Bookings` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `taxi_id` integer,
  `pickup_location` varchar(255) NOT NULL,
  `destination_location` varchar(255) NOT NULL,
  `pickup_time` timestamp,
  `scheduled_time` timestamp,
  `status` enum(pending,confirmed,cancelled,completed) DEFAULT 'pending',
  `created_at` timestamp DEFAULT (now())
);

CREATE TABLE `Notifications` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `message` text NOT NULL,
  `type` enum(booking_confirmation,taxi_arrival,cancellation) NOT NULL,
  `status` enum(sent,pending,failed) DEFAULT 'pending',
  `created_at` timestamp DEFAULT (now())
);

ALTER TABLE `Taxis` ADD FOREIGN KEY (`driver_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Bookings` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Bookings` ADD FOREIGN KEY (`taxi_id`) REFERENCES `Taxis` (`id`);

ALTER TABLE `Notifications` ADD FOREIGN KEY (`user_id`) REFERENCES `Users` (`id`);
