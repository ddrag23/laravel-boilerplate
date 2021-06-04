<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $title ?? config('app.name')  }}</title>
    @include('layout.header')
</head>
<body>
    @include('layout.navbar')
    @include('layout.sidebar')
    @yield('content')
    @include('layout.footer')
    @include('layout.script')
    @yield('modal')
    
</body>
</html>