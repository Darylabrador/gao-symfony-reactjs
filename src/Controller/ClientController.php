<?php

namespace App\Controller;

use App\Entity\Client;
use App\Repository\ClientRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;

class ClientController extends AbstractController
{
    /**
     * @Route("/api/client/search", name="autocomplete", methods={"POST"})
     */
    public function autocomplete(Request $request, ClientRepository $clientRepository, SerializerInterface $serializer): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $clients = $clientRepository->findClients($data['clientInfo']);
        $json = $serializer->serialize($clients, 'json', ['groups' => 'searchClient']);
        $response = new JsonResponse($json, 200, [], true);
        return $response;
    }
}
